import { Alert } from "flowbite-react";
import React, { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Types } from "mongoose";
import { HiInformationCircle } from "react-icons/hi";
import userContext from "../utils/userContext";
import SearchIcon from "@material-ui/icons/Search";
import { Modal } from "flowbite-react";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
// import MapsUgcOutlinedIcon from '@material-ui/icons-material/MapsUgcOutlined';
import { Avatar, Dropdown } from "flowbite-react";
import { getAllUsers, setAvatar, deleteUser } from "../api";
import { useNavigate } from "react-router-dom";


import "./Header.css"

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user, userLogout, isSuccess, refetch, isAlert, setIsAlert } =
    useContext<any>(userContext);

  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] =
  useState<boolean>(false);

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);

  const [avatarImage, setAvatarImage] = useState<string[]>([]);

  const [avatarSelectIndex, setAvatarSelectIndex] = useState<number>(NaN);

  const searchRef = useRef() as any;

  const {
    data: allUsers,
    isLoading: isPreviewLoading,
    refetch: refetchAllUsers,
  } = useQuery({
    queryFn: () => getAllUsers(user && user._id),
    queryKey: ["allUsersData"],
    enabled: !!isSuccess,
  });

  const avt = JSON.parse(localStorage.getItem('user')||'').photo;

  const { isLoading: isAvatarLoading } = useQuery({
    queryFn: async () => {
      const imageData = [];
      for (let i = 0; i < 6; i++) {
        const { data } = await axios.get(
          `https://api.multiavatar.com/4645646/${Math.round(
            Math.random() * 1000
          )}?apikey=nQluaHjWZ83G95`
        );
        const buffer = new Buffer(data);
        imageData.push(buffer.toString("base64"));
      }
      setAvatarImage(imageData);
    },
    queryKey: ["getAvatar"],
    refetchOnWindowFocus: false,
  });

  const handleSetAvatar = useMutation(
    ({ id, imgUrl }: { id: string | Types.ObjectId; imgUrl: string }) =>
      setAvatar({ id, imgUrl }),
    {
      onSuccess: (res) => {
        refetchAllUsers();
        refetch();
        setIsAvatarModalOpen(false);
        setIsAlert({
          ...isAlert,
          isOpen: true,
          title: res.message,
          type: "success",
        });
      },
      onError: (err: any) =>
        setIsAlert({
          ...isAlert,
          isOpen: true,
          title: err.response.data,
          type: "failure",
        }),
    }
  );

  const handleDeleteUser = useMutation((id: string) => deleteUser(id), {
    onSuccess: (res) => {
      userLogout();
      setIsDeleteUserModalOpen(false);
      setIsAlert({
        ...isAlert,
        isOpen: true,
        title: res.message,
        type: "success",
      });
    },
    onError: (err: any) =>
      setIsAlert({
        ...isAlert,
        isOpen: true,
        title: err.response.data,
        type: "failure",
      }),
  });

  const handleUsers = () => {
    navigate('/users')
  }

  return (
    <>
        <div className="app__header">
          <div className="img-logo">

            <img
              className="app__headerImage"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Google_Chat_logo_%282017-2020%29.svg/2560px-Google_Chat_logo_%282017-2020%29.svg.png"
              alt="instagram"
            />
          </div>

          <div className="searchForm">
            <form>
              <SearchIcon className="searchIcon opa" fontSize="medium" />
              <input type="text" id="filter" placeholder="Search" className="searchBarInput no-outline"/>
            </form>
          </div>

          <div className="container-icons">

            <div className="header_icons">
              <HomeIcon fontSize="large" className="header_icon"/>
              
              <NearMeOutlinedIcon fontSize="large" className="header_icon"/>
              <ExploreOutlinedIcon fontSize="large" className="header_icon"/>
              <FavoriteBorderOutlinedIcon fontSize="large" className="header_icon" />

              <div className="avt">
                <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn bg-transparent outline-none border-0 hover:bg-transparent"
                    >
                      <Avatar
                        className="absolute -z-10 text-[#ff6a3d] pointer-events-none w-7 h-7"
                        img={
                          user
                            ? `data:image/svg+xml;base64,${user.photo}`
                            : undefined
                        }
                        rounded={true}
                        status="online"
                        statusPosition="bottom-right"
                      ></Avatar>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow rounded-box w-52 bg-white"
                    >
                      <Dropdown.Header>
                        <span className="block text-sm truncate">
                          {user && user.fullname}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {user && user.email}
                        </span>
                      </Dropdown.Header>

                      <Dropdown.Item onClick={handleUsers}>
                        See all friend
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => setIsAvatarModalOpen(true)}>
                        Pick an Avatar
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => setIsDeleteUserModalOpen(true)}>
                        Delete Account
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={userLogout}>Sign out</Dropdown.Item>
                    </ul>
                </div>
              </div>

            </div>
          </div>

        
        
      </div>
    </>
  );
};

export default Header;
