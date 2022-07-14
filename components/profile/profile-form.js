import { useRef } from 'react';
import classes from './profile-form.module.css';

export default function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = async e => {
    e.preventDefault();
    props.onChangePassword({
      oldPassword: oldPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}
