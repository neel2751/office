"use client";
import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const { data: session } = useSession(); // get the user session
  return (
    <AdminContext.Provider value={session}>{children}</AdminContext.Provider>
  );
};
export const useAdminContext = () => {
  const useContextAdmin = useContext(AdminContext);
  if (!useContextAdmin) {
    // console.log(useContextAdmin); // check if the context is correctly set up
    // toast.error("You are not authorized to access this page"); // if user is not logged in
    // toast.error("useAdminContext must be used within AdminProvider Erro");
  }
  return useContextAdmin;
  // useContext(AdminContext)
};
// export const useTestContext = () => {
//     const session = getServerSession(options);
//     return session;
// }
// export const useTestContext = async () => {
//     const session = await getServerSession(options);
//     return session;
// }

// const session = await getServerSession(options);

// export const AdminContext = createContext(); // create a context
// export const AdminProvider = ({ children }) => {
//   return (
//     <AdminContext.Provider value={{ session }}>
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export const useAdminAuth = () => {
//   const adminContextValue = useContext(AdminContext); // use the context
//   if (adminContextValue === undefined) {
//     throw new Error("useAdminAuth must be used within AdminProvider"); // throw an error if context is not provided
//   }
//   return adminContextValue; // return the context value
// };

// // // Provider Component
// // class UserProvider extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       user: null,
// //       setUser: this.setUser
// //     };
// //   }

// //   // Method to update the state of the user object in our context
// //   setUser = (userData, callback = () => {}) => {
// //     this.setState({ user: userData }, callback);
// //   };

// //   render() {
// //     return <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>;
// //   }
// // }

// // // Higher Order Function that provides a way to access the User Context
// // export const withUser = WrappedComponent => props => (
// //   <UserContext.Consumer>
// //     {context => <WrappedComponent {...props} user={context.user} setUser={context.setUser} />}
// //   </UserContext.Consumer>
// // );

// // // Helper function to check if we are logged in or not
// // export const isLoggedIn = ({ user }) => !!user && user.token;
