import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import { updateProfileAction } from '../../Redux/Auth/auth.action';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: "95%", sm: 500, md: 600 },
  maxHeight: "90vh",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
  overflowY: "auto"
};

export default function ProfileModal({ open, handleClose }) {

  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: auth.user?.firstName || '',
      lastName: auth.user?.lastName || '',
    },
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
      handleClose();
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>

          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <IconButton onClick={handleClose}>
                <CloseSharpIcon />
              </IconButton>
              <p className="font-semibold text-sm sm:text-base">Edit Profile</p>
            </div>
            <Button type="submit" variant="contained" size="small">
              Save
            </Button>
          </div>

          {/* Cover + Avatar */}
          <div className="relative">
            <div className="h-[8rem] sm:h-[12rem]">
              <img
                className="w-full h-full object-cover rounded-md"
                src="https://th.bing.com/th/id/OIP.U1MdjaXPL00AT-yoS2wuhAHaEo"
                alt=""
              />
            </div>

            <Avatar
              className="absolute -bottom-12 left-4 border-4 border-white"
              sx={{
                width: { xs: "5rem", sm: "8rem" },
                height: { xs: "5rem", sm: "8rem" }
              }}
              src="https://th.bing.com/th/id/OIP.XrGVljajcLZhvJGUD-Sc7gHaE7"
            />
          </div>

          {/* Form */}
          <div className="mt-16 space-y-3">

            <TextField
              fullWidth
              size="small"
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              size="small"
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />

          </div>

        </form>
      </Box>
    </Modal>
  );
}