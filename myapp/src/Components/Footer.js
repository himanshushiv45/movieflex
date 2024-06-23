function Footer() {
  return (
    <>
      <div className="container footer">
        <div className="footer-item first">
          <h5>Company</h5>
          <p>About Us</p>
          <p>Career</p>

          <p className="footer-desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptates, quidem?
          </p>
        </div>

        <div className="footer-item">
          <h5>View Website in</h5>
          <p>English</p>
          <p>Hindi</p>
        </div>
        <div className="footer-item">
          <h5>Need Help</h5>
          <p>Visit Help Center</p>
          <p>Share Feedback</p>
        </div>
        <div className="footer-item">
          <h5>Contact With Us</h5>
          <div className="social-icon">
            <i className="fa-brands fa-facebook-f"></i>

            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
