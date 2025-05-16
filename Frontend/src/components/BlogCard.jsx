import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from "@/assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const BlogCard = ({ props }) => {
  const { author, featuredImage, createdAt, title, category, slug } = props;

  return (
    <Link to={RouteBlogDetails(category.slug, slug)}>
      <Card className="pt-5">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={author.avatar || usericon}
                  alt={author.name || "Author"}
                />
              </Avatar>
              <span>{author.name}</span>
            </div>
            {author.role === "admin" && (
              <Badge
                variant="outline"
                className="bg-black bg-opacity-70 text-green-500"
              >
                Admin
              </Badge>
            )}
          </div>

          <div className="my-2">
            <img
              src={featuredImage}
              alt={title}
              className="rounded"
              loading="lazy"
            />
          </div>

          <div>
            <p className="flex items-center gap-2 mb-2">
              <FaRegCalendarAlt />
              <span>{moment(createdAt).format("DD-MM-YYYY")}</span>
            </p>
            <h2 className="text-2xl font-bold line-clamp-2">{title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
