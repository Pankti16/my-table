import React from "react";
import { SortIconProps } from "./SortIcon.types";

import "./style.css";

// Get sort-order enum/object/interface
import { SortOrder } from "../../constants/interfaces";

//Component to show sorting icon
const SortIcon: React.FC<SortIconProps> = ({ column, sortKey, type }) => {
  return (
    <span className="sort-icon-wrapper">
      {sortKey === column && type === SortOrder.ASC ? (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sort-icons"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.9393 1.93934C17.5251 1.35355 18.4748 1.35355 19.0606 1.93934L28.6066 11.4853C29.1923 12.0711 29.1923 13.0208 28.6066 13.6066C28.0208 14.1924 27.071 14.1924 26.4852 13.6066L19.5 6.62132L19.5 33C19.5 33.8284 18.8284 34.5 18 34.5C17.1715 34.5 16.5 33.8284 16.5 33L16.5 6.62132L9.51468 13.6066C8.92889 14.1924 7.97914 14.1924 7.39336 13.6066C6.80757 13.0208 6.80757 12.0711 7.39336 11.4853L16.9393 1.93934Z"
            fill="#222222"
          />
        </svg>
      ) : sortKey === column && type === SortOrder.DESC ? (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sort-icons"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.6066 24.5147L19.0606 34.0607C18.4748 34.6464 17.5251 34.6464 16.9393 34.0607L7.39336 24.5147C6.80757 23.9289 6.80757 22.9792 7.39336 22.3934C7.97914 21.8076 8.92889 21.8076 9.51468 22.3934L16.5 29.3787L16.5 3C16.5 2.17157 17.1715 1.5 18 1.5C18.8284 1.5 19.5 2.17157 19.5 3L19.5 29.3787L26.4852 22.3934C27.071 21.8076 28.0208 21.8076 28.6066 22.3934C29.1923 22.9792 29.1923 23.9289 28.6066 24.5147Z"
            fill="#222222"
          />
        </svg>
      ) : (
        <svg
          width="32"
          height="36"
          viewBox="0 0 32 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sort-icons"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.0572 1.93934C15.5779 1.35355 16.4221 1.35355 16.9428 1.93934L25.4281 11.4853C25.9488 12.0711 25.9488 13.0208 25.4281 13.6066C24.9074 14.1924 24.0632 14.1924 23.5425 13.6066L17.3333 6.62132L17.3333 29.3787L23.5425 22.3934C24.0632 21.8076 24.9074 21.8076 25.4281 22.3934C25.9488 22.9792 25.9488 23.9289 25.4281 24.5147L16.9428 34.0607C16.4221 34.6464 15.5779 34.6464 15.0572 34.0607L6.5719 24.5147C6.0512 23.9289 6.0512 22.9792 6.5719 22.3934C7.0926 21.8076 7.93682 21.8076 8.45752 22.3934L14.6667 29.3787L14.6667 6.62132L8.45752 13.6066C7.93682 14.1924 7.0926 14.1924 6.5719 13.6066C6.0512 13.0208 6.0512 12.0711 6.5719 11.4853L15.0572 1.93934Z"
            fill="#222222"
          />
        </svg>
      )}
    </span>
  );
};

export default SortIcon;
