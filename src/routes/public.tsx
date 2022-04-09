import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Files from "features/files/routes/Files";
import CopyWorker from "features/copyWorker/routes/CopyWorker";
import Mailer from "features/mailer/routes/Mailer";
import ComingSoon from "features/comingSoon/routes/ComingSoon";
import Layout from "components/Layout/Layout";

const PublicRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        location={location}
        classNames="animation"
        timeout={300}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Files />} />
            <Route path="/copy-worker" element={<CopyWorker />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
          </Route>
          <Route path="/mailer" element={<Mailer />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PublicRoutes;
