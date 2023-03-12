import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="409" y="107" rx="3" ry="3" width="52" height="6" />
    <circle cx="533" cy="509" r="72" />
    <circle cx="136" cy="136" r="136" />
    <rect x="0" y="298" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="345" rx="11" ry="11" width="280" height="88" />
    <rect x="4" y="448" rx="11" ry="11" width="95" height="30" />
    <rect x="125" y="440" rx="21" ry="21" width="152" height="45" />
  </ContentLoader>
);

export default MyLoader;
