import { Outlet, useNavigation } from "react-router-dom"
import Navbar from "../components/Navbar";

const PublicRoute = () => {

  const navigation = useNavigation()

  return (
    <div>
      <Navbar />
      <main className="position-relative min-vh-100">
        <div className="d-flex justify-content-center align-items-center mt-4">
          {navigation.state === "loading" && (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicRoute