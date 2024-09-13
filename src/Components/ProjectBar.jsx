import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';

const TravelProjectList = () => {
  const [getTravelData, setGetTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const authData = useSelector((state) => state.auth.authData);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://planner.aiprojectt.com/get_project_data/${authData.user_idx}`
        );
        console.log('API Response:', response);
        setGetTravelData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 가져오는 데 문제가 발생했습니다.');
        setLoading(false);
      }
    };

    if (authData && authData.user_idx) {
      fetchData();
    }
  }, [authData]);

  const toggleList = () => {
    setToggle(!toggle);
  };

  // 여행 계획하기 버튼 클릭 시 calendarpage로 이동
  const goToCalendarPage = () => {
    navigate('/calendarpage');
  };

  // Determine the number of projects to show based on the toggle state
  const displayedProjects = toggle ? getTravelData : getTravelData.slice(0, 5);

  return (
    <div className="w-1/3 p-4 border-r h-full border-gray-300">
      <div className="sidebar-wrapper h-full flex flex-col">
        <div className="project_side_bar_box bg-white p-4 rounded-lg shadow-custom h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold pl-7 ">
              {authData.name}님 여행정보
            </h2>
            {/* 여행 계획하기 버튼 추가 */}
            <button
              onClick={goToCalendarPage}
              className="flex items-center justify-between px-4 py-2 bg-blue-400 rounded-full text-white font-semibold shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out"
            >
              여행 계획하기
              <FaArrowRight className="ml-4" />
            </button>
          </div>
          <div className="inner-sidebar-wrapper flex flex-col h-full">
            <div
              className={`Project_side_bar_wrapper bg-gray-100 p-3 rounded-lg shadow-md ${
                isExpanded ? 'h-auto' : 'h-auto'
              }`}
            >
              <div className="Project_side_bar_container mb-2 flex-1">
                {loading ? (
                  <div>로딩 중...</div>
                ) : error ? (
                  <div>{error}</div>
                ) : displayedProjects.length > 0 ? (
                  displayedProjects.map((project, index) => (
                    <Link
                      key={index}
                      to={`/planner/${project.project_idx}`}
                      className="Project_Link"
                    >
                      <div className="Project_sub_wrapper gap-4 flex flex-col m-3">
                        <div className="bg-gradient-to-r from-gray-600 to-gray-800 shadow-md p-2 rounded hover:opacity-90 hover:scale-105 transform transition duration-300">
                          <h3 className="text-lg font-semibold m-1 text-center text-white ">
                            {project.project_title || '여행 제목 없음'}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="font-bold pl-3">여행 정보 없음</div>
                )}
              </div>
              <div className="bg-slate-300 p-1 m-2 rounded flex flex-col items-center shadow-md">
                {toggle ? (
                  <FaCaretUp
                    className="cursor-pointer transition-transform ease-in-out transform hover:scale-125"
                    onClick={toggleList}
                  />
                ) : (
                  <FaCaretDown
                    className="cursor-pointer transition-transform ease-in-out transform hover:scale-125"
                    onClick={toggleList}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelProjectList;
