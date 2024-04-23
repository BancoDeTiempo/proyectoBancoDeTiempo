import './FigureUser.css';

export const FigureUser = ({ user }) => {
  return (
    <figure className="dataUser">
      <img src={user.image} alt="user_photo" className="imageUser" />
      <h4 className="emailUser">Email: {user.email}</h4>
    </figure>
  );
};
