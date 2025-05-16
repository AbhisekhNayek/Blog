import { getEvn } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { useFetch } from '@/hooks/useFetch';
import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const LikeCount = ({ props }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const user = useSelector(state => state.user);

    // Only fetch if user exists, else empty string to avoid malformed URL
    const userId = user && user.isLoggedIn ? user.user._id : '';

    const { data: blogLikeCount, loading, error } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/blog-like/get-like/${props.blogid}/${userId}`,
        {
            method: 'get',
            credentials: 'include',
        }
    );

    useEffect(() => {
        if (blogLikeCount) {
            setLikeCount(blogLikeCount.likecount);
            setHasLiked(blogLikeCount.isUserliked);
        }
    }, [blogLikeCount]);

    const handleLike = async () => {
        if (!user || !user.isLoggedIn) {
            return showToast('error', 'Please login into your account.');
        }
        try {
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/blog-like/do-like`, {
                method: 'post',
                credentials: 'include',
                headers: { 'Content-type': "application/json" },
                body: JSON.stringify({ user: user.user._id, blogid: props.blogid })
            });

            if (!response.ok) {
                return showToast('error', response.statusText);
            }
            const responseData = await response.json();
            setLikeCount(responseData.likecount);
            setHasLiked(!hasLiked);
        } catch (error) {
            showToast('error', error.message);
        }
    };

    return (
        <button
            onClick={handleLike}
            type='button'
            aria-pressed={hasLiked}
            className='flex justify-between items-center gap-1'
        >
            {!hasLiked ? (
                <FaRegHeart />
            ) : (
                <FaHeart color='red' />
            )}
            {likeCount}
        </button>
    );
};

export default LikeCount;
