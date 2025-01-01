import React, { useState } from "react";
import { message } from "antd";
import { buttonVariants } from "@components/ui/shared/AppButton";
import { IPerformer } from "@interfaces/performer";
import { followService } from "@services/follow.service";

type FollowButtonProps = {
  performer: IPerformer;
  currentUser?: IPerformer | null;
  onFollow?: (data: {
    action: "create" | "delete";
    performerId: string;
  }) => void;
};

const FollowButton: React.FC<FollowButtonProps> = ({
  performer,
  currentUser,
  onFollow,
}) => {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(performer.isFollowed);

  const handleFollow = async () => {
    if (!currentUser) return;

    try {
      if (isFollowing) {
        const confirmUnfollow = window.confirm(
          "Are you sure you want to unfollow this person?"
        );
        if (!confirmUnfollow) return;

        setLoading(true);
        await followService.delete(performer._id);
        onFollow && onFollow({ action: "delete", performerId: performer._id });
        setIsFollowing(false);
      } else {
        setLoading(true);
        await followService.create({
          targetId: performer._id,
          sourceId: currentUser._id,
        });
        onFollow && onFollow({ action: "create", performerId: performer._id });
        setIsFollowing(true);
      }
    } catch (error) {
      message.error(
        (error as Error).message || "Error occurred, please try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  if (currentUser?._id === performer._id) return null;

  return (
    <button
      onClick={handleFollow}
      type="button"
      className={`md:self-end md:ml-16 xl:ml-36 h-10 z-10 ${buttonVariants()}`}
      disabled={loading}
    >
      <span>{isFollowing ? "Unfollow" : "Follow"}</span>
    </button>
  );
};

export default FollowButton;
