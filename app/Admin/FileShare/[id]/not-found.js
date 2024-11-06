import Empty from "./empty";

export default function NotFound() {
  return (
    <Empty
      title={"The id you are looking for does not exist"}
      description={"Generate the new id after you access this page"}
      link={"/Admin/FileShare"}
      linkName={"Back to home"}
    ></Empty>
  );
}
