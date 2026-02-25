import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { profileSchema } from '../validation/validation';
import ProfileView from '../views/Profile.view';
// Note: updateProfile thunk is not yet implemented in authSlice for the backend.
// We will focus on display consistency for now.

const ProfileContainer = () => {
    const { user, loading } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            console.log('Profile update not implemented yet', values);
        },
    });

    useEffect(() => {
        if (user) {
            formik.setValues({
                name: user.name || '',
                email: user.email || '',
            });
        }
    }, [user]);

    return (
        <ProfileView
            formik={formik}
            loading={loading}
            user={user}
        />
    );
};

export default ProfileContainer;
