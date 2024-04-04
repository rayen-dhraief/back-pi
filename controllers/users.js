import User from "../models/User.js";

/* READ */
export const getUsers = async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
export const getAllUsers  = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
          "email",
          "username",
          "avatarImage",
          "_id",
        ]);
        return res.json(users);
      } catch (ex) {
        next(ex);
      }
    };
    
    export const setAvatar = async (req, res, next) => {
        try {
          const userId = req.params.id;
          const avatarImage = req.body.image;
          const userData = await User.findByIdAndUpdate(
            userId,
            {
              isAvatarImageSet: true,
              avatarImage,
            },
            { new: true }
          );
          return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
          });
        } catch (ex) {
          next(ex);
        }
      };

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        console.log(friendId, "your id : ", id, " you are", friendId !== id)
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            if (friendId !== id) {
                user.friends.push(friendId);
                friend.friends.push(id);
            }
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
