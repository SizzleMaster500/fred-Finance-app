import React from 'react';

/**
 * Lightweight articulated 2D Fred for the prototype.
 * Unlike the original static 3D PNG, arms, legs and eyes animate separately.
 * A final 3D-quality version will require a rigged production character.
 */
export default function Fred({winter=false,mood='wave',size=145}) {
  return <svg className={`fred-rig fred-rig--${mood}`} style={{width:size,maxWidth:'100%',height:'auto'}} viewBox="0 0 240 275" role="img" aria-label={`Fred ${winter?'wearing a winter beanie':'wearing his mint cap'}, ${mood}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="fredBody" cx="35%" cy="20%" r="85%"><stop stopColor="#E7B4FF"/><stop offset=".6" stopColor="#C385F2"/><stop offset="1" stopColor="#8D50CA"/></radialGradient>
      <linearGradient id="fredMint" x1="0" x2="1" y2="1"><stop stopColor="#B4F8DA"/><stop offset="1" stopColor="#49CDA1"/></linearGradient>
    </defs>
    <ellipse cx="121" cy="263" rx="81" ry="9" fill="#301647" opacity=".15"/>
    <g className="fred-leg fred-leg--left" style={{transformOrigin:'91px 211px'}}><rect x="80" y="203" width="26" height="35" rx="13" fill="#A96BDE"/><path d="M70 231 Q85 219 108 228 L119 245 Q120 259 102 259 H67 Q57 256 61 244Z" fill="url(#fredMint)" stroke="#7D48B2" strokeWidth="2"/><path d="M61 248 H119 V253 Q116 262 103 262 H67 Q57 260 61 248Z" fill="white"/><path d="M91 233 l4 6 7 0 -5 5 2 7 -8 -4 -6 4 1 -8 -5 -4 8 0Z" fill="white"/></g>
    <g className="fred-leg fred-leg--right" style={{transformOrigin:'151px 211px'}}><rect x="139" y="203" width="26" height="35" rx="13" fill="#A96BDE"/><path d="M128 231 Q145 219 169 228 L180 245 Q180 259 162 259 H127 Q117 256 121 244Z" fill="url(#fredMint)" stroke="#7D48B2" strokeWidth="2"/><path d="M121 248 H180 V253 Q177 262 164 262 H127 Q117 260 121 248Z" fill="white"/><path d="M150 233 l4 6 7 0 -5 5 2 7 -8 -4 -6 4 1 -8 -5 -4 8 0Z" fill="white"/></g>
    <g className="fred-arm fred-arm--left" style={{transformOrigin:'56px 139px'}}><path d="M65 126 Q31 119 22 154 Q15 177 35 183 Q53 183 62 160Z" fill="#B97EE8" stroke="#A467D7" strokeWidth="2"/></g>
    <g className="fred-arm fred-arm--right" style={{transformOrigin:'184px 134px'}}><path d="M175 126 Q200 107 217 76 Q225 60 235 70 Q248 86 231 105 Q213 140 188 160Z" fill="#B97EE8" stroke="#A467D7" strokeWidth="2"/></g>
    <path className="fred-body" d="M119 50 C174 48 203 89 205 147 C210 198 173 224 122 224 C64 224 34 193 37 147 C39 92 70 51 119 50Z" fill="url(#fredBody)" stroke="#A86AD8" strokeWidth="2"/>
    <g className="fred-face"><ellipse cx="84" cy="137" rx="12" ry="17" fill="#21192B"/><ellipse cx="158" cy="137" rx="12" ry="17" fill="#21192B"/><ellipse cx="80" cy="131" rx="4" ry="6" fill="white"/><ellipse cx="154" cy="131" rx="4" ry="6" fill="white"/><ellipse className="fred-blink" cx="84" cy="137" rx="12" ry="17" fill="#21192B" opacity="0"/><ellipse className="fred-blink" cx="158" cy="137" rx="12" ry="17" fill="#21192B" opacity="0"/><ellipse cx="62" cy="164" rx="15" ry="10" fill="#F3A0D2"/><ellipse cx="181" cy="164" rx="15" ry="10" fill="#F3A0D2"/><path d="M103 161 Q121 154 139 161 Q140 185 122 190 Q104 186 103 161Z" fill="#572142"/><path d="M110 179 Q123 169 135 179 Q126 189 119 188Z" fill="#FA779C"/></g>
    {winter ? <g><path d="M57 96 Q52 51 87 34 Q126 12 165 40 Q184 58 183 99Z" fill="#FFF0E1" stroke="#D7C3D4" strokeWidth="2"/><circle cx="122" cy="28" r="22" fill="#A66DDE"/><path d="M54 87 Q117 76 187 87 L187 112 Q121 101 54 112Z" fill="#A66DDE"/><path d="M64 91 V106 M79 89 V108 M95 88 V108 M111 87 V107 M127 87 V107 M143 88 V108 M159 89 V108 M175 91 V106" stroke="#C6A0ED" strokeWidth="3"/><path d="M73 95 l5 6 7 -2 -3 8 5 6 -8 0 -4 7 -3 -8 -8 -2 6 -5Z" fill="#7FE2B9"/></g> : <g><path d="M55 104 Q54 53 108 39 Q167 26 185 88 L183 106Z" fill="url(#fredMint)" stroke="#5AC49E" strokeWidth="3"/><path d="M55 104 Q115 85 187 102 Q178 125 118 119 Q72 118 55 104Z" fill="#65D8AD" stroke="#4CBF9B" strokeWidth="2"/><path d="M119 54 l7 12 14 1 -10 10 3 14 -14 -7 -13 7 2 -14 -10 -10 14 -1Z" fill="#F8F4FF" stroke="#67409B" strokeWidth="3"/></g>}
  </svg>;
}
