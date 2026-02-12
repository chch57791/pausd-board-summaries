import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DATA — Meetings in reverse chronological order
   ═══════════════════════════════════════════════════════════════ */

const MEETINGS = [
  {
    id: "feb-10-2026",
    date: "Feb 10, 2026",
    dateFull: "February 10, 2026",
    type: "Regular Board Meeting",
    videoUrl: "https://www.youtube.com/live/_-7g5_3Kw50",
    agendaUrl: "https://go.boarddocs.com/ca/pausd/Board.nsf/goto?open&id=DQDUUW7DD032",
    duration: "~4 hrs", mood: "Heated & Emotional", moodColor: "#e74c3c",
    tldr: "More than 50 speakers packed the room. The Board directed the district to reverse at least 19 staff layoffs. Students gave emotional testimony about mental health after a 17-year-old's death by suicide at the Churchill Ave. rail crossing. The Board voted to place a $941-per-parcel tax renewal on the June 2026 ballot.",
    sections: [
      { title: "Board Reverses 19+ Staff Layoffs", emoji: "💼", urgency: "high",
        what: "In late January, the district began eliminating at least 19 positions — reading/math specialists, computer techs, aides, a library tech, facilities managers, a security guard, wellness workers, and Paly production tech Verónica Rodríguez. Elementary reading/math specialists were being replaced with a single non-classroom 'Teacher on Special Assignment' per campus. The district projected $2.5–$2.8M/year in savings. These cuts were not disclosed during prior Board budget presentations.",
        whatHappened: "Dozens of educators in PAEA shirts attended. Crowd erupted in jeers; President Dharap called a recess. After 1+ hours of debate, the Board directed staff to reinstate all positions. Austin agreed to start reversals the next day.",
        positions: [
          { who: "Shana Segal (Board Member)", stance: "opposed", stanceLabel: "Led push to reverse cuts", said: "Said eliminating reading/math specialists contradicted the district's PAUSD Promise goals and Every Student Reads Initiative. Questioned why cuts were never disclosed during prior budget presentations." },
          { who: "Rowena Chiu (Vice President)", stance: "opposed", stanceLabel: "Led push to reverse cuts", said: "Worked with Segal to block layoffs before finalization. Public commenters thanked Chiu and Segal by name. Also reportedly confronted Superintendent Austin about his conduct toward a student board rep during the meeting." },
          { who: "Shounak Dharap (Board President)", stance: "mixed", stanceLabel: "Supported reversal with process concerns", said: "Noted the Board was taking an unusual step — blocking a decision before it was finalized, rather than reviewing afterward. According to commenters, initially suggested waiting to see effects before acting. Ultimately joined consensus." },
          { who: "Tom Culbertson, PAEA President", stance: "opposed", stanceLabel: "Strongly opposed cuts", said: "\"When clerical support is stripped away, that labor doesn't disappear — it is shifted onto the backs of already overextended educators.\"" },
          { who: "Samuel Howles-Banerji, Paly science teacher", stance: "opposed", stanceLabel: "Strongly opposed cuts", said: "\"We are the ones sitting with students while they mourn the death of their friends. You don't support students by telling teachers that they are worthless.\"" },
          { who: "Superintendent Don Austin", stance: "supported", stanceLabel: "Originally proposed the cuts", said: "Framed restructuring as offsetting rising costs. When Board directed reversal: \"It's probably just better to return people to where they were. We can start on that tomorrow.\" Criticized for an interaction with a student board rep that left the student shaken." },
        ],
        outcome: "Board directed staff to strike the reduction proposal and restore all positions immediately.",
        bottomLine: "The $2.5–$2.8M in savings must now come from elsewhere. The reversal shows this Board will override the Superintendent when community pressure is strong. But underlying cost pressures remain." },
      { title: "Student Mental Health & Churchill Crossing", emoji: "🚨", urgency: "critical",
        what: "On Feb. 3, Paly student Summer Devi Mehta, 17, died by suicide at the Churchill Ave. railroad crossing — a site of multiple student suicides over the past decade. This is the third suicide cluster to affect Palo Alto. On Feb. 5, Superintendent Austin sent a letter to City Council calling for the crossing's immediate closure, reversing years of opposition.",
        whatHappened: "Students filled the boardroom. Student reps and dozens of speakers called for changes beyond sharing hotline numbers.",
        positions: [
          { who: "Dylan Chen, Paly student board rep", stance: "supported", stanceLabel: "Called for culture change", said: "\"There must be a fundamental culture shift at Paly and across PAUSD.\" Said \"no number of posters or hotlines will ever solve this issue\" if students feel unsafe." },
          { who: "Angelise Chang, student board rep", stance: "supported", stanceLabel: "Criticized response pattern", said: "Told the Board students \"often receive the same vague and impersonal response, an email that avoids the issue head-on.\"" },
          { who: "Superintendent Don Austin", stance: "supported", stanceLabel: "Reversed prior opposition", said: "Wrote to City Council: \"Those operational considerations are real. They are also secondary to the continued loss of life.\" Offered to relocate PAUSD bus fleet to make closure feasible." },
          { who: "Vice President Rowena Chiu", stance: "supported", stanceLabel: "Pushed for funding commitment", said: "Secured agreement to schedule a future Board meeting on funding the crossing closure. Urged volunteers for Track Watch." },
          { who: "Some community members", stance: "mixed", stanceLabel: "Raised logistics concerns", said: "Questioned impact on emergency routes, bike/pedestrian school routes, and whether traffic would shift to other crossings where suicides also occurred. Suggested 24/7 crossing guards as interim step." },
        ],
        outcome: "No formal vote. Board signaled clear support for pursuing closure. VP Chiu secured future funding discussion. The City Council (not PAUSD) has jurisdiction over the crossing.",
        bottomLine: "Austin's reversal is significant. But PAUSD doesn't control the crossing — the City does. Planned AI-based safety upgrades at the crossing were not yet installed when Mehta died." },
      { title: "Parcel Tax Renewal on June 2026 Ballot", emoji: "🗳️", urgency: "medium",
        what: "The voter-approved parcel tax has funded PAUSD since 2001 (renewed in '05, '10, '15, '20). Current rate: $941/parcel with 2% annual adjustment, generating ~$17M/year. Expires 2027. PAUSD spends ~$35,000/student (2x the level from a decade ago). Polling firm FM3 surveyed 504 residents: 72% support for 7-year renewal. Passage requires 66.7%.",
        whatHappened: "Board voted to place the renewal on the June 2026 ballot.",
        positions: [
          { who: "Shana Segal (Board Member)", stance: "supported", stanceLabel: "Supports renewal", said: "Tax funds smaller class sizes, librarians, counselors, instructional specialists." },
          { who: "Josh Salcman (Board Member)", stance: "supported", stanceLabel: "Supports with caveats", said: "Acknowledged $35K/student is high but argued costs keep rising." },
          { who: "Superintendent Don Austin", stance: "supported", stanceLabel: "Strongly supports", said: "\"If you have one loss, you'll see panic like this district has never seen.\"" },
          { who: "Todd Collins, former Board President", stance: "opposed", stanceLabel: "Questioned necessity", said: "Per-student funding doubled in 10 years to ~$35K: \"If property taxes go up and enrollment goes down, funding per pupil just shoots up. It's just math.\"" },
          { who: "Vocal community opposition", stance: "opposed", stanceLabel: "Oppose renewal", said: "Cited $100M+ reserves, ~$35K/student spending (2x comparable districts), declining enrollment, and $65.5M Cubberley land sale." },
        ],
        outcome: "Board voted to place on June 2026 ballot: $941/parcel, 7-year extension, 2% annual adjustment. Seniors 65+ can apply for exemption.",
        bottomLine: "The same night the Board reversed $2.5–$2.8M in cuts, it asked taxpayers for $17M/year. 72% poll support vs. 66.7% passage threshold leaves ~5 points of margin." },
    ],
    nextMeeting: "February 24, 2026"
  },
  {
    id: "jan-20-2026",
    date: "Jan 20, 2026",
    dateFull: "January 20, 2026",
    type: "Regular Board Meeting",
    duration: "~3 hrs", mood: "Routine", moodColor: "#6b7280",
    tldr: "The Board reviewed the first draft of the 2026–27 budget assumptions, approved School Accountability Report Cards for all schools, cut the ribbon on the new 50,000 sq. ft. Hoover Elementary campus, and hired sustainability coordinator Karina Takemoto.",
    sections: [
      { title: "2026–27 Budget Assumptions (First Draft)", emoji: "📊", urgency: "medium",
        what: "Staff presented early planning framework for next year's budget, reflecting the Governor's January budget proposal and current economic conditions. Superintendent Austin wrote in his Jan. 16 update that the Board would examine 'the impact of our parcel tax, student to staff ratios, employee medical benefits increases, and other issues.'",
        whatHappened: "Informational presentation. Board reviewed assumptions; staff said the draft would be refined over spring.",
        positions: [
          { who: "Superintendent Don Austin", stance: "mixed", stanceLabel: "Called for fiscal discipline", said: "\"It's time for a good look in the mirror to remain fiscally responsible. We are fortunate to have a financial position of strength, although some of the key elements — basic aid funding and parcel tax — are under opposition.\"" },
        ],
        outcome: "Informational — no vote. Budget assumptions will return to Board later in spring.",
        bottomLine: "This presentation set the stage for the staff cuts that would be revealed in late January and reversed at the Feb. 10 meeting." },
      { title: "Hoover Elementary Campus Opens", emoji: "🏫", urgency: "info",
        what: "The new 50,000 sq. ft. Hoover Elementary campus opened after years of construction. Students had been temporarily relocated to the Cubberley site during rebuilding. The original Hoover buildings were completely demolished and rebuilt from the ground up.",
        whatHappened: "Ribbon-cutting ceremony. Board and community celebrated the opening.",
        positions: [],
        outcome: "Ceremonial — campus now open.",
        bottomLine: "The Hoover campus had been a source of controversy in 2024–25 over gender-neutral bathroom design. Superintendent Austin clarified that the campus would include a mix of gender-specific and gender-neutral restrooms after parent pushback." },
    ],
  },
  {
    id: "nov-4-2025",
    date: "Nov 4, 2025",
    dateFull: "November 4, 2025",
    type: "Regular Board Meeting",
    duration: "~3 hrs", mood: "Substantive", moodColor: "#ca8a04",
    tldr: "Board directed staff to prepare a parcel tax renewal ballot measure for June 2026, aiming for a 7-year extension. Dharap became Board President and Chiu became Vice President for the 2025–26 term. Discussion of Cubberley master plan and the $65.5M land sale to the City of Palo Alto.",
    sections: [
      { title: "Parcel Tax Renewal Direction", emoji: "🗳️", urgency: "high",
        what: "The parcel tax ($941/parcel, ~$16.5M/year) expires in 2027. Staff presented options for renewal timing and duration. A consultant poll found 72% support among 504 respondents for a 7-year renewal. The tax has been renewed 4 times since 2001.",
        whatHappened: "Board directed staff to prepare ballot language for a June 2026 election, targeting a 7-year extension.",
        positions: [
          { who: "Shana Segal (then-Board President)", stance: "supported", stanceLabel: "Supports 7-year renewal", said: "\"Smaller class sizes, librarians, counselors, instructional specialists — they matter.\"" },
          { who: "Josh Salcman", stance: "supported", stanceLabel: "Supports but noted high spending", said: "\"That sounds like a lot of money. On the other hand, everything keeps getting more expensive.\"" },
          { who: "Superintendent Austin", stance: "supported", stanceLabel: "Urged caution on shorter terms", said: "Warned that a failed ballot measure would cause \"panic like this district has never seen.\"" },
          { who: "Todd Collins, former Board President (public comment)", stance: "opposed", stanceLabel: "Questioned necessity", said: "Per-student funding is ~$35,000, doubled in 10 years, due to rising property taxes and declining enrollment." },
        ],
        outcome: "Board directed staff to prepare a June 2026 ballot measure for a 7-year parcel tax renewal at the current $941 rate with 2% annual adjustment.",
        bottomLine: "Set in motion the ballot measure that was formally approved at the Feb. 10, 2026, meeting." },
      { title: "New Board Leadership Elected", emoji: "🔄", urgency: "info",
        what: "Annual reorganization of Board officers for the 2025–26 term.",
        whatHappened: "Shounak Dharap became Board President. Rowena Chiu became Vice President. Shana Segal, who had served as president, rotated off.",
        positions: [],
        outcome: "Dharap elected president; Chiu elected vice president.",
        bottomLine: "This gave Chiu a leadership role after the contentious first months of 2025 in which her committee assignments had been reassigned following a social media controversy." },
    ],
  },
  {
    id: "jun-3-2025",
    date: "Jun 3, 2025",
    dateFull: "June 3, 2025",
    type: "Regular Board Meeting",
    duration: "~3 hrs", mood: "Contentious", moodColor: "#e67e22",
    tldr: "Board voted 4-1 to extend Superintendent Don Austin's contract to 2029 and raise his salary to $421,272/year, despite a Change.org petition with hundreds of signatures calling for the Board to decline renewal. Board Member Chiu cast the lone dissenting vote.",
    sections: [
      { title: "Superintendent Austin Contract Extended to 2029", emoji: "📝", urgency: "high",
        what: "Superintendent Don Austin has led PAUSD since 2018 and has had his contract renewed six times. A Change.org petition (hundreds of signatures) called on the Board to decline renewal, citing concerns about: elimination of honors biology and honors English ('de-laning'), the contentious ethnic studies vote, gender-neutral bathrooms at Hoover Elementary, and what petitioners described as a culture of intimidation and poor communication with parents.",
        whatHappened: "Multiple parents spoke against renewal during public comment. The Board evaluated Austin in closed session, then voted 4-1 to extend his contract to 2029. The salary increase to $421,272/year was per a pre-existing clause in his contract.",
        positions: [
          { who: "Board majority (Dharap, Segal, Kamhi, Salcman)", stance: "supported", stanceLabel: "Voted to extend contract", said: "Found Austin's performance satisfactory. Evaluated him in closed session." },
          { who: "Board Member Rowena Chiu", stance: "opposed", stanceLabel: "Lone dissent", said: "Cast the only vote against renewal. Did not make detailed public comments on her reasons." },
          { who: "Superintendent Austin", stance: "supported", stanceLabel: "Defended his record", said: "Called the petition's claims inaccurate: \"People can sign whatever they'd like to sign. If they want to put their names on something that has inaccuracies, they can absolutely do that.\" Said \"the depth and breadth of what we offer students is unparalleled.\"" },
          { who: "Parents who opposed renewal", stance: "opposed", stanceLabel: "Called for non-renewal", said: "Cited de-laning of courses, ethnic studies controversy, Hoover bathroom backlash, and alleged pattern of poor communication and dismissiveness toward parent concerns." },
        ],
        outcome: "Board voted 4-1 to extend Austin's contract to 2029 with salary of $421,272/year.",
        bottomLine: "Despite vocal opposition, Austin retained strong Board support (4-1). Chiu's lone dissent reflected the divide between her and the other four Board members that characterized much of 2025." },
    ],
  },
  {
    id: "feb-11-2025",
    date: "Feb 11, 2025",
    dateFull: "February 11, 2025",
    type: "Regular Board Meeting",
    duration: "5+ hrs", mood: "Highly Contentious", moodColor: "#dc2626",
    tldr: "In a packed room with security guards at the door, the Board voted 4-1 to reassign Board Member Rowena Chiu's committee roles following a social media controversy. Chiu accepted the reassignment but called it 'an attempt to silence dissent.' The meeting followed the explosive Jan. 21 and Jan. 23 votes on honors biology and ethnic studies.",
    sections: [
      { title: "Board Reassigns Chiu's Committee Roles (4-1)", emoji: "⚡", urgency: "high",
        what: "After the Jan. 23 ethnic studies vote, Board Member Chiu reposted content on X (Twitter) that critics said targeted a PAUSD staff member, Danaé Reynolds, Executive Director of Curriculum and Instruction, and led to hostile rhetoric against her online. Board President Segal and VP Dharap introduced a resolution to reassign Chiu's liaison roles and ask her to meet with affected staff.",
        whatHappened: "The boardroom was packed wall-to-wall. Security guards limited entry. Pro- and anti-Chiu factions attended. Chiu proposed a counter-motion to accept the reassignment without the other clauses. The Board voted 4-1 on Chiu's counter-motion — with Chiu herself dissenting on her own proposal.",
        positions: [
          { who: "Shana Segal (Board President)", stance: "supported", stanceLabel: "Introduced resolution", said: "Called Chiu's post a \"serious breach\" of governance standards. Said it was \"equivalent to a company's CEO publicly criticizing an employee's views.\"" },
          { who: "Shounak Dharap (Vice President)", stance: "supported", stanceLabel: "Co-introduced resolution", said: "\"The resolution is impact-focused, not intent-focused or judgment-focused.\"" },
          { who: "Rowena Chiu", stance: "opposed", stanceLabel: "Accepted reassignment but called it silencing", said: "Apologized for \"any perceived disrespect toward district staff.\" But said: \"The resolution seems to be an attempt to silence dissent.\"" },
          { who: "Josh Salcman", stance: "mixed", stanceLabel: "Questioned necessity of resolution", said: "\"I wonder, are we engaging in public shaming to some extent?\" Said Chiu had expressed remorse and should be trusted." },
          { who: "Alison Kamhi", stance: "mixed", stanceLabel: "Did not think resolution was necessary", said: "Joined Salcman in questioning whether the resolution was needed." },
        ],
        outcome: "Board voted 4-1 on Chiu's counter-motion to reassign her committee roles. Chiu dissented on her own proposal.",
        bottomLine: "This meeting deepened the divide on the Board and in the community. It triggered two separate (ultimately unsuccessful) recall petitions against Dharap filed in February and April 2025. The divisions from this period carried into 2026." },
    ],
  },
  {
    id: "jan-23-2025",
    date: "Jan 23, 2025",
    dateFull: "January 23, 2025",
    type: "Special Board Meeting",
    duration: "5 hrs", mood: "Highly Contentious", moodColor: "#dc2626",
    tldr: "In a 5-hour special meeting, the Board voted 3-2 to approve the Ethnic Studies course and make it a graduation requirement starting with the Class of 2029 (Fall 2025 freshmen) — accelerating the timeline by one year. The vote came just 7 days after Superintendent Austin announced the course was being 'paused.' A parent later filed a Brown Act complaint; the Brandeis Center filed a lawsuit in July 2025.",
    sections: [
      { title: "Ethnic Studies Approved as Graduation Requirement (3-2)", emoji: "📚", urgency: "critical",
        what: "California's AB 101 required high schools to offer ethnic studies starting in 2025–26, but the mandate was contingent on state funding that Governor Newsom never provided. PAUSD teachers had spent 3 years developing a course. On Jan. 16, Superintendent Austin announced the course was 'paused' with 'no anticipated future date.' Seven days later, Board President Segal called this special meeting to approve it. Over 1,400 residents had signed a petition through PA Parent Alliance pressing for more transparency. The specific curriculum materials had not been provided to the public despite a 4-month-old Public Records Act request.",
        whatHappened: "The boardroom was packed. The Board appeared split 3-2 against during most of the 5-hour meeting, then flipped in the final hour when Salcman changed his position.",
        positions: [
          { who: "Shounak Dharap", stance: "supported", stanceLabel: "Voted yes", said: "Supported the course and the accelerated timeline. Argued teachers had been working on it for years." },
          { who: "Shana Segal", stance: "supported", stanceLabel: "Voted yes — called the meeting", said: "Called the special meeting to bring the course back after Austin's pause. Supported making it a graduation requirement starting with Class of 2029." },
          { who: "Josh Salcman", stance: "supported", stanceLabel: "Voted yes — switched late", said: "Said he supports ethnic studies 'as a concept' and was impressed by students who took the pilot. But expressed concern about process and lack of transparency. Ultimately voted yes." },
          { who: "Rowena Chiu", stance: "opposed", stanceLabel: "Voted no", said: "Supported ethnic studies in principle but opposed the rushed timeline and said the community had not been given adequate opportunity to review curriculum materials." },
          { who: "Alison Kamhi", stance: "opposed", stanceLabel: "Voted no", said: "Similarly supported the concept but opposed the process. Three of five Board members had just been elected in November on platforms that included more community input." },
          { who: "1,400+ petition signers (PA Parent Alliance)", stance: "opposed", stanceLabel: "Sought transparency and delay", said: "Pressed for the public release of curriculum materials and more time for community input before a vote." },
        ],
        outcome: "Board voted 3-2 to approve Ethnic Studies as a graduation requirement starting with Class of 2029 (Fall 2025 freshmen). Dharap, Segal, Salcman voted yes; Chiu, Kamhi voted no.",
        bottomLine: "This vote and the honors biology vote two days earlier defined the 2025 school board conflicts. A parent filed a Brown Act complaint in February; the Brandeis Center filed a lawsuit in July alleging the Board misled the public about the agenda item. District officials called the claims 'meritless.' The ethnic studies course was implemented for Fall 2025." },
    ],
  },
  {
    id: "jan-21-2025",
    date: "Jan 21, 2025",
    dateFull: "January 21, 2025",
    type: "Regular Board Meeting",
    duration: "~3 hrs", mood: "Contentious", moodColor: "#e67e22",
    tldr: "The Board voted 3-2 to merge freshman Honors Biology and regular Biology into a single course starting Fall 2025 — part of a broader 'de-laning' effort. All Paly and Gunn science teachers supported the change. The move drew national attention, including criticism from Congressman Ro Khanna.",
    sections: [
      { title: "Honors Biology Eliminated for Freshmen (3-2)", emoji: "🧬", urgency: "high",
        what: "Since 2018, when California adopted a new K-12 science framework, PAUSD had been considering merging honors and regular biology into one course. All current biology teachers at both Paly and Gunn supported the change. The merged course would allow teachers to 'differentiate instruction' within the class — offering deeper work for students who want more rigor. UC schools do not weight 9th-grade courses, and PAUSD's honors bio had not carried extra GPA weight.",
        whatHappened: "Science teachers presented their case. Student board reps voted against the merger. Superintendent Austin and Danaé Reynolds (Executive Director of Curriculum) supported the teacher recommendation.",
        positions: [
          { who: "Shounak Dharap", stance: "supported", stanceLabel: "Voted yes", said: "Supported teacher recommendation." },
          { who: "Shana Segal", stance: "supported", stanceLabel: "Voted yes", said: "Supported teacher recommendation." },
          { who: "Alison Kamhi", stance: "supported", stanceLabel: "Voted yes", said: "Voted with Dharap and Segal on this item (unlike the ethnic studies vote two days later)." },
          { who: "Josh Salcman", stance: "opposed", stanceLabel: "Voted no", said: "Expressed concern about removing rigorous options for advanced students." },
          { who: "Rowena Chiu", stance: "opposed", stanceLabel: "Voted no", said: "Opposed removing the honors option. Aligned with parents who wanted to preserve course differentiation." },
          { who: "Student board reps", stance: "opposed", stanceLabel: "Voted against merger", said: "One student rep noted she had de-laned from honors herself and it was 'not a big deal,' but the reps collectively voted against removing the option." },
          { who: "All Paly/Gunn biology teachers", stance: "supported", stanceLabel: "Unanimously supported merger", said: "Every biology teacher, including AP bio teachers, favored the change. Said they could differentiate within the merged class." },
        ],
        outcome: "Board voted 3-2 to merge honors and regular biology into one freshman course starting Fall 2025. Dharap, Segal, Kamhi voted yes; Salcman, Chiu voted no.",
        bottomLine: "This was the first of two 3-2 votes in 72 hours (followed by ethnic studies on Jan. 23) that set off months of community conflict. Congressman Ro Khanna and tech entrepreneur Garry Tan publicly criticized the decision. It was framed by critics as part of a broader 'de-laning' trend under Austin's tenure. Together, these two votes triggered the recall attempts against Dharap." },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   UI COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function StancePill({ stance }) {
  const c = { supported: { bg:"#dcfce7",fg:"#166534",b:"#bbf7d0",t:"IN FAVOR" }, opposed: { bg:"#fee2e2",fg:"#991b1b",b:"#fecaca",t:"OPPOSED" }, mixed: { bg:"#fef3c7",fg:"#92400e",b:"#fde68a",t:"MIXED" } }[stance] || { bg:"#fef3c7",fg:"#92400e",b:"#fde68a",t:"MIXED" };
  return <span style={{ display:"inline-block",padding:"2px 7px",borderRadius:4,fontSize:9,fontWeight:700,letterSpacing:"0.7px",background:c.bg,color:c.fg,border:`1px solid ${c.b}`,flexShrink:0 }}>{c.t}</span>;
}
function UrgencyLabel({ u }) {
  const c = { critical:{c:"#dc2626",l:"URGENT"},high:{c:"#ea580c",l:"HIGH IMPACT"},medium:{c:"#ca8a04",l:"NOTABLE"},info:{c:"#6b7280",l:"INFO"} }[u]||{c:"#6b7280",l:"INFO"};
  return <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.8px",color:c.c,textTransform:"uppercase" }}>● {c.l}</span>;
}

function PositionCard({ p, last }) {
  const [o,setO]=useState(false);
  return (
    <div style={{ borderBottom:last?"none":"1px solid #f0f0f0",padding:"10px 0" }}>
      <button onClick={()=>setO(!o)} style={{ display:"flex",alignItems:"flex-start",gap:8,width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"inherit",padding:0 }}>
        <StancePill stance={p.stance}/>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13,fontWeight:600,color:"#1e293b",lineHeight:1.3 }}>{p.who}</div>
          <div style={{ fontSize:12,color:"#64748b",marginTop:1 }}>{p.stanceLabel}</div>
        </div>
        <span style={{ fontSize:14,color:"#94a3b8",transform:o?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",lineHeight:1 }}>▾</span>
      </button>
      {o && <div style={{ fontSize:13,color:"#475569",lineHeight:1.65,marginTop:8,borderLeft:"2px solid #e2e8f0",paddingLeft:12 }}>{p.said}</div>}
    </div>
  );
}

function SectionBlock({ s }) {
  const [o,setO]=useState(false);
  const r=useRef(null);
  const [h,setH]=useState(0);
  useEffect(()=>{ if(r.current) setH(r.current.scrollHeight); },[o,s]);
  return (
    <div style={{ background:"#fff",borderRadius:10,marginBottom:10,border:"1px solid #e5e7eb",overflow:"hidden",boxShadow:o?"0 2px 12px rgba(0,0,0,0.06)":"none",transition:"box-shadow 0.2s" }}>
      <button onClick={()=>setO(!o)} style={{ width:"100%",display:"flex",alignItems:"center",gap:10,padding:"14px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"inherit" }}>
        <span style={{ fontSize:22,flexShrink:0 }}>{s.emoji}</span>
        <div style={{ flex:1 }}><UrgencyLabel u={s.urgency}/><div style={{ fontSize:15,fontWeight:600,color:"#0f172a",lineHeight:1.35,marginTop:2 }}>{s.title}</div></div>
        <span style={{ fontSize:16,color:"#94a3b8",transform:o?"rotate(180deg)":"rotate(0)",transition:"transform 0.25s",lineHeight:1 }}>▾</span>
      </button>
      <div style={{ maxHeight:o?h+40:0,overflow:"hidden",transition:"max-height 0.4s ease" }}>
        <div ref={r} style={{ padding:"0 16px 16px" }}>
          <div style={{ background:"#f8fafc",borderRadius:8,padding:14,marginBottom:14 }}>
            <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",color:"#94a3b8",marginBottom:6 }}>Background</div>
            {s.what.split("\n\n").map((p,i)=><p key={i} style={{ fontSize:13,color:"#334155",lineHeight:1.65,margin:i?'8px 0 0':0 }}>{p}</p>)}
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",color:"#94a3b8",marginBottom:6 }}>What Happened</div>
            <p style={{ fontSize:13,color:"#334155",lineHeight:1.65,margin:0 }}>{s.whatHappened}</p>
          </div>
          {s.positions.length > 0 && (
            <div style={{ background:"#f8fafc",borderRadius:8,padding:14,marginBottom:14 }}>
              <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",color:"#94a3b8",marginBottom:8 }}>Who Said What — tap to expand</div>
              {s.positions.map((p,i)=><PositionCard key={i} p={p} last={i===s.positions.length-1}/>)}
            </div>
          )}
          <div style={{ background:"#eff6ff",borderRadius:8,padding:14,borderLeft:"3px solid #3b82f6",marginBottom:14 }}>
            <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",color:"#1d4ed8",marginBottom:4 }}>Outcome</div>
            <p style={{ fontSize:13,color:"#1e3a5f",lineHeight:1.6,margin:0 }}>{s.outcome}</p>
          </div>
          <div style={{ background:"#fefce8",borderRadius:8,padding:14,borderLeft:"3px solid #eab308" }}>
            <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",color:"#a16207",marginBottom:4 }}>Why It Matters</div>
            <p style={{ fontSize:13,color:"#78350f",lineHeight:1.6,margin:0 }}>{s.bottomLine}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingPage({ m }) {
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e293b 100%)",borderRadius:12,padding:20,marginBottom:16,color:"#fff" }}>
        <div style={{ fontSize:10,fontWeight:700,letterSpacing:"1.2px",color:"#67e8f9",marginBottom:8,textTransform:"uppercase" }}>Summary — {m.dateFull}</div>
        <p style={{ fontSize:14,lineHeight:1.65,margin:0,color:"#e2e8f0" }}>{m.tldr}</p>
      </div>
      <div style={{ display:"flex",flexWrap:"wrap",gap:12,marginBottom:14,fontSize:12,color:"#64748b" }}>
        <span>⏱ {m.duration}</span>
        <span style={{ padding:"2px 8px",borderRadius:12,fontSize:11,fontWeight:600,background:m.moodColor+"15",color:m.moodColor,border:`1px solid ${m.moodColor}30` }}>{m.mood}</span>
        {m.videoUrl && <a href={m.videoUrl} target="_blank" rel="noopener noreferrer" style={{ color:"#2563eb",textDecoration:"none" }}>📺 Watch</a>}
        {m.agendaUrl && <a href={m.agendaUrl} target="_blank" rel="noopener noreferrer" style={{ color:"#2563eb",textDecoration:"none" }}>📋 Agenda</a>}
      </div>
      {m.sections.map((s,i)=><SectionBlock key={i} s={s}/>)}
      {m.nextMeeting && <div style={{ fontSize:12,color:"#94a3b8",marginTop:12 }}>Next meeting: {m.nextMeeting}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */

export default function App() {
  const [sel,setSel]=useState(MEETINGS[0]);
  const [about,setAbout]=useState(false);
  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",maxWidth:680,margin:"0 auto",padding:"20px 14px 60px",background:"#fafafa",minHeight:"100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@400;600;700&display=swap" rel="stylesheet"/>
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:34,height:34,borderRadius:8,background:"linear-gradient(135deg,#14532d,#166534)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17 }}>🌲</div>
          <div>
            <h1 style={{ fontSize:20,fontWeight:700,margin:0,color:"#0f172a",fontFamily:"'Source Serif 4',Georgia,serif" }}>PAUSD Board Meetings</h1>
            <div style={{ fontSize:12,color:"#94a3b8",fontWeight:500 }}>Plain-English summaries · Palo Alto School Board</div>
          </div>
        </div>
      </div>
      <button onClick={()=>setAbout(!about)} style={{ fontSize:12,color:"#2563eb",background:"none",border:"none",cursor:"pointer",padding:"0 0 10px",fontFamily:"inherit",fontWeight:500 }}>{about?"Close":"ℹ️ About this project"}</button>
      {about && (
        <div style={{ background:"#fff",borderRadius:10,padding:16,marginBottom:14,border:"1px solid #e5e7eb",fontSize:13,color:"#475569",lineHeight:1.6 }}>
          <p style={{ margin:"0 0 8px" }}><strong>What is this?</strong> Factual summaries of each PAUSD Board of Education meeting: what was discussed, decided, and who took which positions. Quotes attributed to named speakers.</p>
          <p style={{ margin:"0 0 8px" }}><strong>Sources:</strong> Meeting videos (Midpen Media/YouTube), BoardDocs agendas, Palo Alto Online, PA Daily Post, The Paly Voice, Midpeninsula Post, PAUSD updates.</p>
          <p style={{ margin:0 }}><strong>Note:</strong> Independent community project. Not published by or affiliated with PAUSD.</p>
        </div>
      )}
      <div style={{ display:"flex",gap:6,overflowX:"auto",paddingBottom:6,marginBottom:14,WebkitOverflowScrolling:"touch" }}>
        {MEETINGS.map(m=>(
          <button key={m.id} onClick={()=>setSel(m)} style={{ padding:"7px 12px",borderRadius:8,flexShrink:0,border:sel.id===m.id?"2px solid #166534":"1px solid #d1d5db",background:sel.id===m.id?"#dcfce7":"#fff",cursor:"pointer",fontFamily:"inherit",minWidth:0 }}>
            <div style={{ fontSize:12,fontWeight:600,color:sel.id===m.id?"#166534":"#1e293b",whiteSpace:"nowrap" }}>{m.date}</div>
            <div style={{ fontSize:10,color:"#94a3b8",marginTop:1,whiteSpace:"nowrap" }}>{m.type}</div>
          </button>
        ))}
      </div>
      {sel && <MeetingPage m={sel}/>}
      <div style={{ marginTop:28,paddingTop:16,borderTop:"1px solid #e5e7eb",textAlign:"center",fontSize:11,color:"#94a3b8",lineHeight:1.7 }}>
        <div>Independent project · Not affiliated with PAUSD</div>
        <div>Board: Dharap (Pres.), Chiu (VP), Segal, Kamhi, Salcman · Supt: Don Austin</div>
        <div style={{ marginTop:4 }}>Meetings streamed by <a href="https://midpenmedia.org/pausd-board-meetings/" target="_blank" rel="noopener noreferrer" style={{ color:"#94a3b8" }}>Midpen Media Center</a></div>
      </div>
    </div>
  );
}
