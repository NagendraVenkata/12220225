import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Log } from '../middleware/logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("shortUrls");
    const urlList = stored ? JSON.parse(stored) : [];

    const matched = urlList.find(entry => entry.shortcode === shortcode);

    if (!matched) {
      Log({
        stack: "frontend",
        level: "error",
        pkg: "hook",
        message: `Shortcode not found: ${shortcode}`
      });
      navigate("/"); // fallback to home if shortcode is invalid
      return;
    }

    const expiryTime = new Date(matched.expiry);
    if (new Date() > expiryTime) {
      Log({
        stack: "frontend",
        level: "warn",
        pkg: "hook",
        message: `Shortcode expired: ${shortcode}`
      });
      alert("This short link has expired.");
      navigate("/");
      return;
    }

    // Log the successful redirection
    Log({
      stack: "frontend",
      level: "info",
      pkg: "hook",
      message: `Redirecting shortcode: ${shortcode} → ${matched.longUrl}`
    });

    // Delay a bit so log completes
    setTimeout(() => {
      window.location.href = matched.longUrl;
    }, 500);
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
