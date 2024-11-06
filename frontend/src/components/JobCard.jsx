import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentDate = new Date();
    const diffTime = currentDate - createdAt;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };
  return (
    <div className="p-5 rounded-md border-gray-100 shadow-xl bg-white">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" size="icon" className="p-6">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.companyName}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description?.split(" ").slice(0, 9).join(" ") +
            (job?.description?.split(" ").length > 9 ? "..." : "")}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobtype}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="ouline"
        >
          View Details
        </Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  );
};

export default JobCard;
