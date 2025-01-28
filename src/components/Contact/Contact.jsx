import s from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
const Contact = ({ contactItem, onDelete }) => {
  const { name, phone } = contactItem;

  const handleDeleteClick = () => {
    onDelete(contactItem);
  };

  return (
    <div className={s.contactContainer}>
      <ul className={s.contactlist}>
        <li className={s.contactItem}>
          <FaUser className={s.contacimg} /> {name}
        </li>
        <li className={s.contactItem}>
          <BsFillTelephoneFill className={s.contacimg} /> {phone}
        </li>
      </ul>
      <button
        className={s.contactBtn}
        type="button"
        onClick={handleDeleteClick}
      >
        Усунути
      </button>
    </div>
  );
};

export default Contact;
