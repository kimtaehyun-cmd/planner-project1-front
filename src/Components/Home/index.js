import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Itempanel from '../Itempanel';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import SlideSection from '../SlideSection';
import AdImgSection from '../AdImgSection';
import { FaAnglesUp } from 'react-icons/fa6';

const Index = () => {
  const [isFooterVisible, setFooterVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false); // 스크롤 버튼 표시 여부

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setFooterVisible(true);
      } else {
        setFooterVisible(false);
      }

      // 스크롤 위치가 일정 이상이면 버튼 표시
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 맨 위로 스크롤 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="Page_Wrapper flex flex-col bg-white relative">
      <Navbar />
      <div className="Page_container flex flex-col">
        <div className="flex items-start justify-center mt-40">
          <div className="flex">
            <Sidebar />
            <Itempanel />
          </div>
        </div>
        <div className="mt-40 bg-gray-100">
          <SlideSection />
        </div>
        <div className=" mt-40 mb-20">
          <AdImgSection />
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 w-full" />

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 w-[32px] h-[32px] md:w-[48px] md:h-[48px] flex justify-center items-center bg-white opacity-100 hover:text-lightScheme-primary hover:scale-150 duration-150 rounded-full drop-shadow-2xl"
        >
          <FaAnglesUp className="text-black" />
        </button>
      )}
    </div>
  );
};

export default Index;
