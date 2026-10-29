/*
 * PHARMACY CONTENT FILE
 * ---------------------
 * Assignment Rule 1: the student writes and checks the pharmacy content.
 * Before submitting, check EVERY row below against your own lecture notes
 * or a reference book (e.g. BNF, Katzung's Basic & Clinical Pharmacology),
 * correct anything that does not match, and fill in SOURCES at the bottom.
 *
 * Each medicine needs:
 *   name  - generic medicine name
 *   cls   - drug class (each class should be different from the others)
 *   use   - one main use (indication), short and general
 *
 * No doses, strengths, frequencies, interactions or schedules are used in this game.
 */
const MEDICINES = [
  { name: "Amoxicillin",   cls: "Penicillin antibiotic",              use: "Bacterial infections" },
  { name: "Ciprofloxacin", cls: "Fluoroquinolone antibiotic",         use: "Bacterial infections (e.g. urinary tract)" },
  { name: "Metformin",     cls: "Biguanide",                          use: "Type 2 diabetes" },
  { name: "Atorvastatin",  cls: "Statin (HMG-CoA reductase inhibitor)", use: "High cholesterol" },
  { name: "Amlodipine",    cls: "Calcium channel blocker",            use: "High blood pressure and angina" },
  { name: "Lisinopril",    cls: "ACE inhibitor",                      use: "High blood pressure and heart failure" },
  { name: "Losartan",      cls: "Angiotensin II receptor blocker (ARB)", use: "High blood pressure" },
  { name: "Atenolol",      cls: "Beta blocker",                       use: "High blood pressure" },
  { name: "Furosemide",    cls: "Loop diuretic",                      use: "Oedema (fluid retention)" },
  { name: "Omeprazole",    cls: "Proton pump inhibitor (PPI)",        use: "Acid reflux and peptic ulcer" },
  { name: "Salbutamol",    cls: "Short-acting beta-2 agonist",        use: "Relief of asthma symptoms" },
  { name: "Ibuprofen",     cls: "NSAID",                              use: "Pain and inflammation" },
  { name: "Sertraline",    cls: "SSRI antidepressant",                use: "Depression" },
  { name: "Warfarin",      cls: "Vitamin K antagonist (anticoagulant)", use: "Preventing blood clots" },
  { name: "Cetirizine",    cls: "Second-generation antihistamine",    use: "Allergies and hay fever" }
];

/* Write where each fact came from. You will be asked about this in the Q&A. */
const SOURCES = [
  "Student lecture notes - Pharmacology (add course name and topic)",
  "British National Formulary (BNF) - add edition and the sections you checked",
  "Katzung, Basic & Clinical Pharmacology - add edition and chapters you checked"
];
