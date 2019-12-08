import React from "react";
import styles from "./LoadingSpinner.scss";
import classNames from "classnames";

interface Props {}

const LoadingSpinner: React.FC<Props> = props => {
  return (
    <div
      className={classNames("loader w-4 h-4 inline-block ml-2", styles.loader)}
    />
  );
};

export default LoadingSpinner;
