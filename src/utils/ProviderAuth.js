import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { createAuthProvider } from "react-token-auth";
import { selector } from "lib/nearhandler";

//Calling the save token function from a library react-token-auth
const { useAuth, login, logout } = createAuthProvider({
  storageKey: "accessToken",
  storage: localStorage,
  /*
  onUpdateToken: (token) => fetch('/update-token', {
    method: 'POST',
    body: JSON.stringify(token),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(r => r.json()),
*/
});

/**
 * This is to extract the stored token and then create a function called authFetch and include it in the header.
 * @param url Api Uri
 * @param  options params if required
 * @param Authorization this token from localstorage
 * @returns response and Http code
 */
export const authFetch = async (url, options = {}) => {
  try {
    const token = localStorage.getItem("accessToken");
    const cleanToken = token.replace(/['"]+/g, "");

    if (!cleanToken) {
      throw new Error("No access token found");
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${cleanToken}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (
      response.status !== 200 &&
      response.status !== 201 &&
      response.status !== 204
    ) {
      throw new Error(`HTTP error! status: ${response.status}`, { cause: await response.json() });
    }

    return await response.json();
  } catch (error) {
    console.error("authFetch error:", error.message);
    throw error;
  }
};

/**
 * This function checks the validity of the session by checking the exp within the token.
 * @returns false if Token is expired
 * @returns true if Token is valid and the section is formating
 */
export const isTokenValid = async (showMessage = true) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    if (showMessage) {
      Swal.fire({
        icon: "warning",
        title: "Session not available",
        text: "Please register account first.",
      });
    }
    return false;
  }

  const decodedToken = jwtDecode(token); // Decode JWT token
  const now = Date.now() / 1000;

  if (decodedToken.exp < now) {
    if (showMessage) {
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again.",
      });
    }
    return false; // Token is expired
  }

  try {
    await selector.wallet();
  } catch (error) {
    if (showMessage) {
      if (error.message === "No wallet selected") {
        Swal.fire({
          icon: "warning",
          title: "No Wallet Connected",
          text: "Please connect a wallet to proceed.",
        });
      }
    }
    return false;
  }

  return true; // Token is valid
};

export { useAuth, login, logout };
