/**
 * 🔒 SECURE VAULT: "ARE YOUR FRIENDS USING YOU?" (108 ITEMS)
 * * Measures transactional/exploitative dynamics across 12 subgroups.
 */

export type Question = {
  id: string;
  moduleKey: string;
  subscaleKey: string;
  text: string;
  options: string[];
  reverseScore?: boolean;
};

const agree5 = ["1 - Strongly Disagree", "2 - Disagree", "3 - Neutral", "4 - Agree", "5 - Strongly Agree"];

export const friendUsedQuestions: Question[] = [
  // 1. Favor Frequency (FF)
  { id: "FU_FF_1", moduleKey: "1", subscaleKey: "Favor Frequency", text: "My friends ask me to do them favors more often than I ask them.", options: agree5 },
  { id: "FU_FF_2", moduleKey: "1", subscaleKey: "Favor Frequency", text: "People in my circle expect me to handle practical tasks for them (pickups, errands).", options: agree5 },
  { id: "FU_FF_3", moduleKey: "1", subscaleKey: "Favor Frequency", text: "I often find myself saying 'yes' to requests even when it's inconvenient.", options: agree5 },
  { id: "FU_FF_4", moduleKey: "1", subscaleKey: "Favor Frequency", text: "My friends ask me for help about as often as I ask for theirs.", options: agree5, reverseScore: true },
  { id: "FU_FF_5", moduleKey: "1", subscaleKey: "Favor Frequency", text: "I am the person people call when they need something immediate.", options: agree5 },
  { id: "FU_FF_6", moduleKey: "1", subscaleKey: "Favor Frequency", text: "I frequently cancel my plans to help a friend with their needs.", options: agree5 },
  { id: "FU_FF_7", moduleKey: "1", subscaleKey: "Favor Frequency", text: "Friends contact me primarily to request assistance rather than to hang out.", options: agree5 },
  { id: "FU_FF_8", moduleKey: "1", subscaleKey: "Favor Frequency", text: "I feel pressured to agree to favors even when I don’t want to.", options: agree5 },
  { id: "FU_FF_9", moduleKey: "1", subscaleKey: "Favor Frequency", text: "When someone else can do the task, they still ask me first.", options: agree5 },

  // 2. Reciprocity Balance (RB)
  { id: "FU_RB_1", moduleKey: "2", subscaleKey: "Reciprocity Balance", text: "If I help a friend repeatedly, I expect the same level of help in return.", options: agree5 },
  { id: "FU_RB_2", moduleKey: "2", subscaleKey: "Reciprocity Balance", text: "I feel I get roughly as much support from friends as I give them.", options: agree5, reverseScore: true },
  { id: "FU_RB_3", moduleKey: "2", subscaleKey: "Reciprocity Balance", text: "I mentally track who returns favors in my social circle.", options: agree5 },
  { id: "FU_RB_4", moduleKey: "2", subscaleKey: "Reciprocity Balance", text: "When I help, the favor is seldom reciprocated.", options: agree5 },
  { id: "FU_RB_5", moduleKey: "2", subscaleKey: "Reciprocity Balance", text: "I have cut off friends because they never returned what I gave.", options: agree5 },
  { id: "FU_RB_6", moduleKey: "2", subscaleKey: "Reciprocity Balance", text: "I often wait for friends to offer help before I ask them for it.", options: agree5 },
  { id: "FU_RB_7", moduleKey: "2", subscaleKey: "Reciprocity Balance", text: "My friendships feel one-sided more often than balanced.", options: agree5 },
  { id: "FU_RB_8", moduleKey: "2", subscaleKey: "Reciprocity Balance", text: "I feel resentful when my efforts go unnoticed or unrewarded.", options: agree5 },
  { id: "FU_RB_9", moduleKey: "2", subscaleKey: "Reciprocity Balance", text: "Reciprocity is a core part of how I evaluate a friend.", options: agree5 },

  // 3. Emotional Labor Burden (ELB)
  { id: "FU_ELB_1", moduleKey: "3", subscaleKey: "Emotional Labor", text: "Friends unload their emotional problems on me frequently.", options: agree5 },
  { id: "FU_ELB_2", moduleKey: "3", subscaleKey: "Emotional Labor", text: "I am expected to comfort people even when I'm emotionally drained.", options: agree5 },
  { id: "FU_ELB_3", moduleKey: "3", subscaleKey: "Emotional Labor", text: "My emotional energy is respected by my friends.", options: agree5, reverseScore: true },
  { id: "FU_ELB_4", moduleKey: "3", subscaleKey: "Emotional Labor", text: "I often play counselor/therapist for people who do not do the same for me.", options: agree5 },
  { id: "FU_ELB_5", moduleKey: "3", subscaleKey: "Emotional Labor", text: "People frequently vent to me with no intention to fix the issue.", options: agree5 },
  { id: "FU_ELB_6", moduleKey: "3", subscaleKey: "Emotional Labor", text: "I feel emotionally exhausted after spending time with certain friends.", options: agree5 },
  { id: "FU_ELB_7", moduleKey: "3", subscaleKey: "Emotional Labor", text: "Friends contact me at odd hours expecting emotional support.", options: agree5 },
  { id: "FU_ELB_8", moduleKey: "3", subscaleKey: "Emotional Labor", text: "I alter my mood to match what others need from me.", options: agree5 },
  { id: "FU_ELB_9", moduleKey: "3", subscaleKey: "Emotional Labor", text: "When I share my problems, they get minimized or ignored.", options: agree5 },

  // 4. Boundary Respect (BR)
  { id: "FU_BR_1", moduleKey: "4", subscaleKey: "Boundary Respect", text: "Friends ignore my clearly stated boundaries (time, topics, people).", options: agree5 },
  { id: "FU_BR_2", moduleKey: "4", subscaleKey: "Boundary Respect", text: "I have to repeat my limits before friends take them seriously.", options: agree5 },
  { id: "FU_BR_3", moduleKey: "4", subscaleKey: "Boundary Respect", text: "My friends usually respect when I say 'I can't'.", options: agree5, reverseScore: true },
  { id: "FU_BR_4", moduleKey: "4", subscaleKey: "Boundary Respect", text: "People pressure me to change plans even when I've said I'm unavailable.", options: agree5 },
  { id: "FU_BR_5", moduleKey: "4", subscaleKey: "Boundary Respect", text: "My boundaries are often treated as flexible by people who know me.", options: agree5 },
  { id: "FU_BR_6", moduleKey: "4", subscaleKey: "Boundary Respect", text: "Friends push into areas of my life I consider off-limits.", options: agree5 },
  { id: "FU_BR_7", moduleKey: "4", subscaleKey: "Boundary Respect", text: "I tolerate boundary crossing to keep the peace.", options: agree5 },
  { id: "FU_BR_8", moduleKey: "4", subscaleKey: "Boundary Respect", text: "Friends sometimes use guilt to get me to change a boundary.", options: agree5 },
  { id: "FU_BR_9", moduleKey: "4", subscaleKey: "Boundary Respect", text: "My 'no' is commonly followed by persuasion or repeated asks.", options: agree5 },

  // 5. Conditional Presence (CP)
  { id: "FU_CP_1", moduleKey: "5", subscaleKey: "Conditional Presence", text: "My friends are present when it helps them (events, status) but not when I need them.", options: agree5 },
  { id: "FU_CP_2", moduleKey: "5", subscaleKey: "Conditional Presence", text: "Friends attend my success events when others will see, but miss low-key moments.", options: agree5 },
  { id: "FU_CP_3", moduleKey: "5", subscaleKey: "Conditional Presence", text: "My friends support me both publicly and privately.", options: agree5, reverseScore: true },
  { id: "FU_CP_4", moduleKey: "5", subscaleKey: "Conditional Presence", text: "People only reach out when they want something visible (a ride, group status).", options: agree5 },
  { id: "FU_CP_5", moduleKey: "5", subscaleKey: "Conditional Presence", text: "I notice people disappear when situations don't benefit them.", options: agree5 },
  { id: "FU_CP_6", moduleKey: "5", subscaleKey: "Conditional Presence", text: "Friends show solidarity when it doesn't cost them anything.", options: agree5 },
  { id: "FU_CP_7", moduleKey: "5", subscaleKey: "Conditional Presence", text: "I'm often the one who initiates contact after a quiet spell.", options: agree5 },
  { id: "FU_CP_8", moduleKey: "5", subscaleKey: "Conditional Presence", text: "People only come around when they want to be invited to something.", options: agree5 },
  { id: "FU_CP_9", moduleKey: "5", subscaleKey: "Conditional Presence", text: "My friendships feel transactional around social appearances.", options: agree5 },

  // 6. Opportunism & Social Climbing (OSC)
  { id: "FU_OSC_1", moduleKey: "6", subscaleKey: "Opportunism", text: "Some friends introduce me to useful people but rarely follow up.", options: agree5 },
  { id: "FU_OSC_2", moduleKey: "6", subscaleKey: "Opportunism", text: "People in my group mention my connections when convenient for them.", options: agree5 },
  { id: "FU_OSC_3", moduleKey: "6", subscaleKey: "Opportunism", text: "My acquaintances use me to reach contacts I have.", options: agree5 },
  { id: "FU_OSC_4", moduleKey: "6", subscaleKey: "Opportunism", text: "Friends highlight our association to look better in front of others.", options: agree5 },
  { id: "FU_OSC_5", moduleKey: "6", subscaleKey: "Opportunism", text: "My friends celebrate my wins without trying to benefit from them.", options: agree5, reverseScore: true },
  { id: "FU_OSC_6", moduleKey: "6", subscaleKey: "Opportunism", text: "I'm asked to showcase my achievements to impress others.", options: agree5 },
  { id: "FU_OSC_7", moduleKey: "6", subscaleKey: "Opportunism", text: "People around me act friendlier when they can gain social benefits.", options: agree5 },
  { id: "FU_OSC_8", moduleKey: "6", subscaleKey: "Opportunism", text: "I receive messages only when my influence or network could be helpful.", options: agree5 },
  { id: "FU_OSC_9", moduleKey: "6", subscaleKey: "Opportunism", text: "Friends may have dated or courted me for access to my circle.", options: agree5 },

  // 7. Time Drain (TD)
  { id: "FU_TD_1", moduleKey: "7", subscaleKey: "Time Drain", text: "Some friends monopolize my free time regularly.", options: agree5 },
  { id: "FU_TD_2", moduleKey: "7", subscaleKey: "Time Drain", text: "It's hard to schedule personal projects because of last-minute social asks.", options: agree5 },
  { id: "FU_TD_3", moduleKey: "7", subscaleKey: "Time Drain", text: "My time commitments with friends feel balanced.", options: agree5, reverseScore: true },
  { id: "FU_TD_4", moduleKey: "7", subscaleKey: "Time Drain", text: "I often stay longer than I want because friends don't notice cues.", options: agree5 },
  { id: "FU_TD_5", moduleKey: "7", subscaleKey: "Time Drain", text: "My friends frequently expect immediate availability.", options: agree5 },
  { id: "FU_TD_6", moduleKey: "7", subscaleKey: "Time Drain", text: "People assume they can borrow my time without asking in advance.", options: agree5 },
  { id: "FU_TD_7", moduleKey: "7", subscaleKey: "Time Drain", text: "I miss personal deadlines because friends ask for help at the last minute.", options: agree5 },
  { id: "FU_TD_8", moduleKey: "7", subscaleKey: "Time Drain", text: "I cancel other plans to accommodate a friend's sudden needs.", options: agree5 },
  { id: "FU_TD_9", moduleKey: "7", subscaleKey: "Time Drain", text: "I feel guilty saying 'I have no time' to friends.", options: agree5 },

  // 8. Financial/Material Drain (FMD)
  { id: "FU_FMD_1", moduleKey: "8", subscaleKey: "Financial Drain", text: "Friends regularly borrow money or goods and do not repay.", options: agree5 },
  { id: "FU_FMD_2", moduleKey: "8", subscaleKey: "Financial Drain", text: "People expect I'll pay for group expenses more often than others.", options: agree5 },
  { id: "FU_FMD_3", moduleKey: "8", subscaleKey: "Financial Drain", text: "Financial requests from friends are infrequent and fair.", options: agree5, reverseScore: true },
  { id: "FU_FMD_4", moduleKey: "8", subscaleKey: "Financial Drain", text: "I cover costs for friends at events and they rarely contribute.", options: agree5 },
  { id: "FU_FMD_5", moduleKey: "8", subscaleKey: "Financial Drain", text: "A friend has privately asked for money with no plan to repay.", options: agree5 },
  { id: "FU_FMD_6", moduleKey: "8", subscaleKey: "Financial Drain", text: "I avoid asking friends for money because they never help me back.", options: agree5 },
  { id: "FU_FMD_7", moduleKey: "8", subscaleKey: "Financial Drain", text: "People assume I'll front purchases (tickets/food) without discussing it.", options: agree5 },
  { id: "FU_FMD_8", moduleKey: "8", subscaleKey: "Financial Drain", text: "Friends guilt me about pennies or small reimbursements even after I loaned large amounts.", options: agree5 },
  { id: "FU_FMD_9", moduleKey: "8", subscaleKey: "Financial Drain", text: "I hide financial strain because friends ask to borrow.", options: agree5 },

  // 9. Reliability Asymmetry (RA)
  { id: "FU_RA_1", moduleKey: "9", subscaleKey: "Reliability Asymmetry", text: "When I need help, friends are often unavailable.", options: agree5 },
  { id: "FU_RA_2", moduleKey: "9", subscaleKey: "Reliability Asymmetry", text: "I can rely on my friends in an emergency.", options: agree5, reverseScore: true },
  { id: "FU_RA_3", moduleKey: "9", subscaleKey: "Reliability Asymmetry", text: "Friends promise to help but cancel at the last minute.", options: agree5 },
  { id: "FU_RA_4", moduleKey: "9", subscaleKey: "Reliability Asymmetry", text: "People expect me to pick up their slack if they fail to deliver.", options: agree5 },
  { id: "FU_RA_5", moduleKey: "9", subscaleKey: "Reliability Asymmetry", text: "I'm the one who steps in to make plans happen when others flake.", options: agree5 },
  { id: "FU_RA_6", moduleKey: "9", subscaleKey: "Reliability Asymmetry", text: "My commitments are treated as more mandatory than others' commitments.", options: agree5 },
  { id: "FU_RA_7", moduleKey: "9", subscaleKey: "Reliability Asymmetry", text: "Friends frequently show inconsistent follow-through.", options: agree5 },
  { id: "FU_RA_8", moduleKey: "9", subscaleKey: "Reliability Asymmetry", text: "I find myself rescheduling my life to accommodate unreliable friends.", options: agree5 },
  { id: "FU_RA_9", moduleKey: "9", subscaleKey: "Reliability Asymmetry", text: "I'm judged for not adapting when friends change plans without notice.", options: agree5 },

  // 10. Manipulative Signal Exposure (MSE)
  { id: "FU_MSE_1", moduleKey: "10", subscaleKey: "Manipulation", text: "Friends use guilt or obligation to influence my choices.", options: agree5 },
  { id: "FU_MSE_2", moduleKey: "10", subscaleKey: "Manipulation", text: "I have been told I'm 'too sensitive' after I call out bad behavior.", options: agree5 },
  { id: "FU_MSE_3", moduleKey: "10", subscaleKey: "Manipulation", text: "My friends are straightforward and do not manipulate.", options: agree5, reverseScore: true },
  { id: "FU_MSE_4", moduleKey: "10", subscaleKey: "Manipulation", text: "People twist my words to make me feel responsible for their problems.", options: agree5 },
  { id: "FU_MSE_5", moduleKey: "10", subscaleKey: "Manipulation", text: "I receive ultimatums framed as 'help or lose me.'", options: agree5 },
  { id: "FU_MSE_6", moduleKey: "10", subscaleKey: "Manipulation", text: "Someone has lied to me to get what they want from me.", options: agree5 },
  { id: "FU_MSE_7", moduleKey: "10", subscaleKey: "Manipulation", text: "I am offered compliments followed by requests that feel manipulative.", options: agree5 },
  { id: "FU_MSE_8", moduleKey: "10", subscaleKey: "Manipulation", text: "Friends threaten to withdraw friendship when I don't comply.", options: agree5 },
  { id: "FU_MSE_9", moduleKey: "10", subscaleKey: "Manipulation", text: "I feel coerced into choices to avoid conflict or drama.", options: agree5 },

  // 11. Appreciation & Credit (AC)
  { id: "FU_AC_1", moduleKey: "11", subscaleKey: "Appreciation", text: "My efforts are often taken for granted by people I help.", options: agree5 },
  { id: "FU_AC_2", moduleKey: "11", subscaleKey: "Appreciation", text: "Friends rarely acknowledge my contributions in front of others.", options: agree5 },
  { id: "FU_AC_3", moduleKey: "11", subscaleKey: "Appreciation", text: "People regularly say 'thank you' and credit me where due.", options: agree5, reverseScore: true },
  { id: "FU_AC_4", moduleKey: "11", subscaleKey: "Appreciation", text: "I feel invisible when I do favors that help others shine.", options: agree5 },
  { id: "FU_AC_5", moduleKey: "11", subscaleKey: "Appreciation", text: "Friends sometimes adopt my idea as their own without credit.", options: agree5 },
  { id: "FU_AC_6", moduleKey: "11", subscaleKey: "Appreciation", text: "I have been excluded from credit on a group project or plan.", options: agree5 },
  { id: "FU_AC_7", moduleKey: "11", subscaleKey: "Appreciation", text: "People downplay my effort as 'no big deal.'", options: agree5 },
  { id: "FU_AC_8", moduleKey: "11", subscaleKey: "Appreciation", text: "I receive little recognition after helping out significantly.", options: agree5 },
  { id: "FU_AC_9", moduleKey: "11", subscaleKey: "Appreciation", text: "Friends expect things from me but forget to say thanks.", options: agree5 },

  // 12. Dependency Engineering (DE)
  { id: "FU_DE_1", moduleKey: "12", subscaleKey: "Dependency", text: "Friends subtly discourage my relationships with others that could help me.", options: agree5 },
  { id: "FU_DE_2", moduleKey: "12", subscaleKey: "Dependency", text: "Someone has isolated me from alternative support under the guise of closeness.", options: agree5 },
  { id: "FU_DE_3", moduleKey: "12", subscaleKey: "Dependency", text: "My friends encourage me to stay independent and grow other supports.", options: agree5, reverseScore: true },
  { id: "FU_DE_4", moduleKey: "12", subscaleKey: "Dependency", text: "I've been told I 'owe' a relationship because they helped me once.", options: agree5 },
  { id: "FU_DE_5", moduleKey: "12", subscaleKey: "Dependency", text: "Friends remind me of favors to control future choices.", options: agree5 },
  { id: "FU_DE_6", moduleKey: "12", subscaleKey: "Dependency", text: "People make me feel guilty for wanting space from the group.", options: agree5 },
  { id: "FU_DE_7", moduleKey: "12", subscaleKey: "Dependency", text: "Someone ridicules my other supports to keep me dependent.", options: agree5 },
  { id: "FU_DE_8", moduleKey: "12", subscaleKey: "Dependency", text: "I feel my social options are purposely limited by one or more friends.", options: agree5 },
  { id: "FU_DE_9", moduleKey: "12", subscaleKey: "Dependency", text: "My network shrinks after close friendships because others are discouraged from connecting with me.", options: agree5 }
];
