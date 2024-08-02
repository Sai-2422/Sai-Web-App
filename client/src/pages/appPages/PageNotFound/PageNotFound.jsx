import styles from "./PageNotFound.module.css";

const NotFoundPage = () => {
  return (
    <div
      style={{
        color: "red",
        fontSize: "20px",
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <h1>Page not found</h1>
    </div>
  );
};

export default NotFoundPage;
