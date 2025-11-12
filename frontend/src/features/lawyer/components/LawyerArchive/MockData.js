// src/components/ArchiveComponents/mockData.js
export const fetchArchivedCases = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 1,
      caseNumber: "C-2024-001",
      clientName: "Johnathan Davis Corporation",
      caseType: "Commercial Litigation",
      stages: [
        {
          stage: "Initial Filing & Discovery",
          memorandum: "Commercial_Litigation_Memo_v2.pdf",
          mdSigned: true,
          ragabApproved: true,
          hearingDate: "2024-03-15",
          documents: ["complaint_filing.pdf", "discovery_requests.pdf", "exhibit_a.pdf"],
          courtProof: "filing_confirmation_001.pdf",
        },
        {
          stage: "Appeal Proceedings",
          memorandum: "Appeal_Brief_Final.pdf",
          mdSigned: true,
          ragabApproved: true,
          hearingDate: "2024-06-20",
          documents: ["appeal_notice.pdf", "appellant_brief.pdf", "oral_argument_transcript.pdf"],
          courtProof: "appeal_acceptance_proof.pdf",
        },
      ],
      lastUpdated: "2024-07-10",
      archiveReference: "ARCH-CL-2024-001",
    },
    {
      id: 2,
      caseNumber: "C-2024-002",
      clientName: "Sarah Johnson Enterprises",
      caseType: "Intellectual Property",
      stages: [
        {
          stage: "Trademark Registration",
          memorandum: "TM_Registration_Memo_Final.pdf",
          mdSigned: true,
          ragabApproved: false,
          hearingDate: "2024-02-28",
          documents: ["trademark_application.pdf", "specimen_submission.pdf", "office_action_response.pdf"],
          courtProof: "tm_filing_receipt.pdf",
        },
      ],
      lastUpdated: "2024-03-15",
      archiveReference: "ARCH-IP-2024-002",
    },
    {
      id: 3,
      caseNumber: "C-2024-003",
      clientName: "Global Tech Solutions Inc.",
      caseType: "Contract Dispute",
      stages: [
        {
          stage: "Arbitration Proceedings",
          memorandum: "Arbitration_Memo_Complete.pdf",
          mdSigned: true,
          ragabApproved: true,
          hearingDate: "2024-05-10",
          documents: ["arbitration_agreement.pdf", "witness_statements.pdf", "expert_report.pdf"],
          courtProof: "arbitration_award.pdf",
        },
      ],
      lastUpdated: "2024-06-01",
      archiveReference: "ARCH-CD-2024-003",
    },
  ];
};