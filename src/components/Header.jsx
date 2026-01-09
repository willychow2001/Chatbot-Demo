import React from 'react';
const Header = () => {
  return (
    <header className="flex items-center p-4 border-b border-[#333] bg-chat-bg sticky top-0 z-10 h-16">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-chat-secondary text-chat-accent">
          <svg 
            width="24" 
            height="24" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 810 810"
          >
            <path strokeLinecap="butt"  transform="matrix(0.75, 0, 0, 0.75, 95.026919, 315.613979)" fill="none" strokeLinejoin="miter" d="M 0.000566708 20.49907 L 826.573525 20.49907 " stroke="currentColor"  strokeWidth="41" strokeOpacity="1" strokeMiterlimit="4"/>
            <path strokeLinecap="butt" transform="matrix(0.534862, 0.525759, -0.525759, 0.534862, 94.843388, 300.369878)" fill="none" strokeLinejoin="miter" d="M 14.53944 14.448712 C 207.715815 208.82244 400.888308 208.822985 594.064284 14.45041 " stroke="currentColor"  strokeWidth="41" strokeOpacity="1" strokeMiterlimit="4"/>
            <path strokeLinecap="butt" transform="matrix(0.534862, -0.525759, 0.525759, 0.534862, 389.619533, 620.343613)" fill="none" strokeLinejoin="miter" d="M 14.540591 14.454057 C 207.712852 208.822981 400.892711 208.822373 594.065434 14.452359 " stroke="currentColor"  strokeWidth="41" strokeOpacity="1" strokeMiterlimit="4"/>
            <path strokeLinecap="butt" transform="matrix(0.373632, -0.650307, 0.650307, 0.373632, 509.002658, 323.922366)" fill="none" strokeLinejoin="miter" d="M -0.00157664 17.99913 L 171.047963 18.000086 " stroke="currentColor"  strokeWidth="36" strokeOpacity="1" strokeMiterlimit="4"/>
            <path strokeLinecap="butt" transform="matrix(0.380283, -0.64644, 0.64644, 0.380283, 577.436038, 330.324407)" fill="none" strokeLinejoin="miter" d="M 0.000649021 17.997071 L 158.229226 17.997416 " stroke="currentColor"  strokeWidth="36" strokeOpacity="1" strokeMiterlimit="4"/>
            <path strokeLinecap="round" transform="matrix(0.459763, -0.592552, 0.592552, 0.459763, 530.390593, 208.384037)" fill="none" strokeLinejoin="miter" d="M 30.836004 62.815111 C 83.508352 8.524607 128.088975 7.739388 164.580143 60.470876 " stroke="currentColor"  strokeWidth="43" strokeOpacity="1" strokeMiterlimit="4"/>
            <path strokeLinecap="round" transform="matrix(0.3147, 0.680782, -0.680782, 0.3147, 666.393546, 106.014581)" fill="none" strokeLinejoin="miter" d="M 31.376125 41.086179 C 58.515552 14.338655 89.120971 14.985132 123.197111 43.027795 " stroke="currentColor"  strokeWidth="43" strokeOpacity="1" strokeMiterlimit="4"/>
            <path strokeLinecap="round" transform="matrix(-0.471459, 0.583289, -0.583289, -0.471459, 704.563912, 201.098638)" fill="none" strokeLinejoin="miter" d="M 30.004379 26.493256 C 48.629708 20.131453 66.269644 19.850003 82.913591 25.644077 " stroke="currentColor"  strokeWidth="43" strokeOpacity="1" strokeMiterlimit="4"/>
            <path strokeLinecap="butt" transform="matrix(0.75, 0, 0, 0.75, 283.894501, 608.546173)" fill="none" strokeLinejoin="miter" d="M 23.500041 4.573852 L 23.500041 71.532189 C 23.500041 89.204065 37.828167 103.532191 55.500043 103.532191 L 267.427137 103.532191 C 285.104221 103.532191 299.427138 89.204065 299.427138 71.532189 L 299.427138 0.000935487 " stroke="currentColor"  strokeWidth="47" strokeOpacity="1" strokeMiterlimit="4"/>
          </svg>          
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">中醫練習小助手</h1>
          <p className="text-xs text-gray-400">Powered by Vertex AI</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
