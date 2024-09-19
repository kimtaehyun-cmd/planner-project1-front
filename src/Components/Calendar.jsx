import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // DateRangePicker의 기본 스타일 파일
import 'react-date-range/dist/theme/default.css'; // DateRangePicker의 테마 CSS 파일
import { useNavigate, useParams } from 'react-router-dom';
import ko from 'date-fns/locale/ko'; // 한국어 로케일 가져오기
import { useSelector } from 'react-redux';

const Calendar = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const { user_idx } = useParams(); // URL 파라미터에서 user_idx를 가져옴
  const authData = useSelector((state) => state.auth.authData); // Redux에서 사용자 인증 정보를 가져옴

  // DateRangePicker의 선택된 날짜 범위를 저장하는 상태
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(), // 기본 시작 날짜를 오늘로 설정
    endDate: new Date(), // 기본 종료 날짜를 오늘로 설정
    key: 'selection', // DateRangePicker에서 요구하는 키값
  });

  const [loading, setLoading] = useState(false); // 로딩 상태를 관리하는 상태

  useEffect(() => {
    // 페이지가 로드될 때 항상 오늘 날짜로 설정
    const today = new Date();
    setSelectionRange({
      startDate: today,
      endDate: today,
      key: 'selection',
    });
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // DateRangePicker에서 날짜가 선택될 때 호출되는 함수
  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setSelectionRange(selection); // 선택된 날짜 범위를 상태로 업데이트
  };

  // 날짜를 'YYYY-MM-DD' 형식으로 포맷팅하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 선택된 날짜 범위를 서버에 저장하는 함수
  const handleSaveDates = () => {
    const formattedStartDate = formatDate(selectionRange.startDate);
    const formattedEndDate = formatDate(selectionRange.endDate);

    const dataToSend = {
      user_idx: authData.user_idx, // 사용자의 고유 식별자
      startDate: formattedStartDate, // 포맷된 시작 날짜
      endDate: formattedEndDate, // 포맷된 종료 날짜
    };

    // POST 요청으로 선택된 날짜를 서버에 전송
    axios
      .post('https://planner.aiprojectt.com/post_calendar', dataToSend, {
        headers: { 'Content-Type': `application/json` },
      })
      .then((response) => {
        navigate('/createplanner'); // 성공적으로 저장된 후에 페이지 이동
      })
      .catch((error) => {
        console.error('Error saving dates:', error); // 에러 발생 시 콘솔에 출력
      });
  };

  useEffect(() => {
    const addYearSuffix = () => {
      const yearPicker = document.querySelector('.rdrYearPicker select'); // <select> 요소 선택

      if (yearPicker) {
        const options = yearPicker.options;
        for (let i = 0; i < options.length; i++) {
          const year = options[i].textContent;
          if (!year.includes('년')) {
            options[i].textContent = `${year}년`; // 연도 뒤에 '년' 붙이기
          }
        }
      }
    };

    addYearSuffix(); // 컴포넌트가 렌더링된 후 연도에 '년'을 붙임
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  return (
    <div className="w-3/5 h-[80%] flex flex-col justify-center items-center">
      <div className="w-[70%] h-[90%] p-4 rounded-xl shadow-lg flex flex-col border border-gray-400">
        <div
          className="inline-block text-center p-2 text-3xl mb-4 border-b-2 border-black"
          style={{ width: 'fit-content', margin: '0 auto' }}
        >
          여행 기간이 어떻게 되시나요?
        </div>

        {loading ? (
          <div>Loading...</div> // 로딩 중일 때 표시되는 메시지
        ) : (
          <div className="flex-grow flex justify-center items-center pl-4">
            <DateRangePicker
              ranges={[selectionRange]} // 선택된 날짜 범위를 설정
              onChange={handleSelect} // 날짜 선택 시 호출되는 함수
              className="w-full h-full custom-calendar"
              staticRanges={[]} // 프리셋 범위 비활성화
              inputRanges={[]} // 입력 범위 비활성화
              locale={ko} // DateRangePicker의 로케일을 한국어로 설정
            />
          </div>
        )}
        {/* 날짜 선택 버튼을 우측으로 정렬 */}
        <div className="mt-4 flex justify-end mr-4">
          <button
            onClick={handleSaveDates}
            className="bg-gray-900 text-white py-2 px-10 rounded hover:bg-gray-700"
          >
            날짜 선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
