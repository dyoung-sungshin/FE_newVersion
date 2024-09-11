import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GroupForm from './pages/GroupForm';
import GroupDetail from './pages/GroupDetail';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import PrivateGroup from './pages/PrivateGroup';
import MemoryForm from './pages/MemoryForm';

import MemoryDetail from './pages/MemoryDetail';


function App() {
  return (
    <Router>
      <Routes>
        {/* 그룹 목록 조회 페이지 (메인 화면) */}
        <Route path="/" element={<HomePage />} />

        {/* 그룹 만들기 페이지 */}
        <Route path="/GroupForm" element={<Layout><GroupForm /></Layout>} />

        {/* 그룹 상세 페이지 */}
        <Route path="/group/:id" element={<Layout><GroupDetail /></Layout>} />

        {/* 비공개 그룹 상세 페이지 */}
        <Route path="/privategroup/:groupId" element={<Layout><PrivateGroup /></Layout>} />

        {/* 추억 올리기 페이지 */}
        <Route path="/groups/:groupId/memoryForm" element={<Layout><MemoryForm /></Layout>} />

        {/* 추억 상세 페이지 */}
        <Route path="/memorydetail" element={<Layout><MemoryDetail /></Layout>} />
         

        {/* Error 페이지 */}
        <Route path="/errorpage" element={<Layout><ErrorPage /></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;
