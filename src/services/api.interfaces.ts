export interface TranslationData {
    data: Data
    meta: Meta
    "pending-user-prompts": any[]
    "sg-entities": Entity[]
  }
  
  export interface Data {
    "current-translation-job-id": string
    "translation-job-state": string
    workspace: string
  }
  
  export interface Meta {
    "api-version": number
    "request-id": string
    "time-stamp": number
  }
  
  export interface Entity {
    "alleds-translation-job/id"?: string
    "config-rtui"?: ConfigRtui
    "curated-translation-memory"?: CuratedTranslationMemory
    "job-step"?: JobStep
    "job-type"?: string
    "last-synced-at"?: number
    "lock-version"?: number
    "progress-tracking"?: ProgressTracking
    "source-file"?: SourceFile
    state?: string
    "target-language-code-3"?: string
    "workflow-step"?: WorkflowStep
    blocks?: Block[]
    policies?: Policies
    "target-file"?: TargetFile
    "target-language-chars"?: TargetLanguageChars
    "ui-options-for-select/type"?: string
    entries?: any[]
    "user/id"?: string
    jwt?: string
    email?: string
    name?: string
  }
  
  export interface ConfigRtui {
    omega_pm_job_step_time_limit_for_b10: OmegaPmJobStepTimeLimitForB10
    omega_pm_job_step_time_limit_for_b12: OmegaPmJobStepTimeLimitForB12
    omega_pm_job_step_time_limit_for_c08: OmegaPmJobStepTimeLimitForC08
    omega_pm_job_step_time_limit_for_c09: OmegaPmJobStepTimeLimitForC09
    omega_pm_job_step_time_limit_for_d10: OmegaPmJobStepTimeLimitForD10
    omega_pm_job_step_time_limits_active: OmegaPmJobStepTimeLimitsActive
    rtui_tred_show_translation_suggestions: RtuiTredShowTranslationSuggestions
    omega_pm_master_translation_workflow_id: OmegaPmMasterTranslationWorkflowId
    omega_fe_job_assignment_workflow_step_id: OmegaFeJobAssignmentWorkflowStepId
    omega_lc_job_assignment_workflow_step_id: OmegaLcJobAssignmentWorkflowStepId
    omega_tr_job_assignment_workflow_step_id: OmegaTrJobAssignmentWorkflowStepId
    rtui_tred_translation_job_progress_items: RtuiTredTranslationJobProgressItems
    omega_alleds_localization_stylesheet_name: OmegaAlledsLocalizationStylesheetName
    omega_pm_internet_pdf_release_workflow_id: OmegaPmInternetPdfReleaseWorkflowId
    omega_tr_reset_caption_completions_at_b12: OmegaTrResetCaptionCompletionsAtB12
    rtui_tred_validate_punctuation_consistency: RtuiTredValidatePunctuationConsistency
    omega_pm_earliest_internet_pdf_release_after: OmegaPmEarliestInternetPdfReleaseAfter
    rtui_tred_show_translation_suggestions_deepl: RtuiTredShowTranslationSuggestionsDeepl
    omega_au_proof_recording_corrections_workflow_step_id: OmegaAuProofRecordingCorrectionsWorkflowStepId
    omega_pm_job_steps_overdue_after_x_days_of_inactivity: OmegaPmJobStepsOverdueAfterXDaysOfInactivity
    rtui_tred_show_translation_suggestions_google_auto_ml: RtuiTredShowTranslationSuggestionsGoogleAutoMl
    omega_tr_auto_populate_captions_from_translation_memory: OmegaTrAutoPopulateCaptionsFromTranslationMemory
    rtui_tred_insert_and_delete_paragraph_breaks_in_classes: RtuiTredInsertAndDeleteParagraphBreaksInClasses
    omega_fe_claimable_job_step_assignment_workflow_step_ids: OmegaFeClaimableJobStepAssignmentWorkflowStepIds
    omega_lc_claimable_job_step_assignment_workflow_step_ids: OmegaLcClaimableJobStepAssignmentWorkflowStepIds
    omega_tr_claimable_job_step_assignment_workflow_step_ids: OmegaTrClaimableJobStepAssignmentWorkflowStepIds
    omega_pm_trigger_new_draft_translation_jobs_automatically: OmegaPmTriggerNewDraftTranslationJobsAutomatically
    omega_au_notify_managers_when_job_is_ready_for_assign_to_record: OmegaAuNotifyManagersWhenJobIsReadyForAssignToRecord
  }
  
  export interface OmegaPmJobStepTimeLimitForB10 {
    type: string
    value: Value
    source: string
    hierarchy: [string, Hierarchy][]
    description: string
  }
  
  export interface Value {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface Hierarchy {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface OmegaPmJobStepTimeLimitForB12 {
    type: string
    value: Value2
    source: string
    hierarchy: [string, Hierarchy2][]
    description: string
  }
  
  export interface Value2 {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface Hierarchy2 {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface OmegaPmJobStepTimeLimitForC08 {
    type: string
    value: Value3
    source: string
    hierarchy: [string, Hierarchy3][]
    description: string
  }
  
  export interface Value3 {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface Hierarchy3 {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface OmegaPmJobStepTimeLimitForC09 {
    type: string
    value: Value4
    source: string
    hierarchy: [string, Hierarchy4][]
    description: string
  }
  
  export interface Value4 {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface Hierarchy4 {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface OmegaPmJobStepTimeLimitForD10 {
    type: string
    value: Value5
    source: string
    hierarchy: [string, Hierarchy5][]
    description: string
  }
  
  export interface Value5 {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface Hierarchy5 {
    enforce: boolean
    expiry_effects: string[]
    due_soon_effects: string[]
    adjustment_factor: number
  }
  
  export interface OmegaPmJobStepTimeLimitsActive {
    type: string
    value: boolean
    source: string
    hierarchy: [string, boolean][]
    description: string
  }
  
  export interface RtuiTredShowTranslationSuggestions {
    type: string
    value: boolean
    source: string
    hierarchy: [string, boolean][]
    description: string
  }
  
  export interface OmegaPmMasterTranslationWorkflowId {
    type: string
    value: string
    source: string
    hierarchy: string[][]
    description: string
  }
  
  export interface OmegaFeJobAssignmentWorkflowStepId {
    type: string
    value: string
    source: string
    hierarchy: string[][]
    description: string
  }
  
  export interface OmegaLcJobAssignmentWorkflowStepId {
    type: string
    value: string
    source: string
    hierarchy: string[][]
    description: string
  }
  
  export interface OmegaTrJobAssignmentWorkflowStepId {
    type: string
    value: string
    source: string
    hierarchy: string[][]
    description: string
  }
  
  export interface RtuiTredTranslationJobProgressItems {
    type: string
    value: any[]
    source: string
    hierarchy: [string, any[]][]
    description: string
  }
  
  export interface OmegaAlledsLocalizationStylesheetName {
    type: string
    value: string
    source: string
    hierarchy: string[][]
    description: string
  }
  
  export interface OmegaPmInternetPdfReleaseWorkflowId {
    type: string
    value: string
    source: string
    hierarchy: string[][]
    description: string
  }
  
  export interface OmegaTrResetCaptionCompletionsAtB12 {
    type: string
    value: boolean
    source: string
    hierarchy: [string, boolean][]
    description: string
  }
  
  export interface RtuiTredValidatePunctuationConsistency {
    type: string
    value: boolean
    source: string
    hierarchy: [string, boolean][]
    description: string
  }
  
  export interface OmegaPmEarliestInternetPdfReleaseAfter {
    type: string
    value: string
    source: string
    hierarchy: string[][]
    description: string
  }
  
  export interface RtuiTredShowTranslationSuggestionsDeepl {
    type: string
    value: boolean
    source: string
    hierarchy: [string, boolean][]
    description: string
  }
  
  export interface OmegaAuProofRecordingCorrectionsWorkflowStepId {
    type: string
    value: string
    source: string
    hierarchy: string[][]
    description: string
  }
  
  export interface OmegaPmJobStepsOverdueAfterXDaysOfInactivity {
    type: string
    value: number
    source: string
    hierarchy: [string, number][]
    description: string
  }
  
  export interface RtuiTredShowTranslationSuggestionsGoogleAutoMl {
    type: string
    value: boolean
    source: string
    hierarchy: [string, boolean][]
    description: string
  }
  
  export interface OmegaTrAutoPopulateCaptionsFromTranslationMemory {
    type: string
    value: boolean
    source: string
    hierarchy: [string, boolean][]
    description: string
  }
  
  export interface RtuiTredInsertAndDeleteParagraphBreaksInClasses {
    type: string
    value: any[]
    source: string
    hierarchy: [string, any[]][]
    description: string
  }
  
  export interface OmegaFeClaimableJobStepAssignmentWorkflowStepIds {
    type: string
    value: string[]
    source: string
    hierarchy: [string, string[]][]
    description: string
  }
  
  export interface OmegaLcClaimableJobStepAssignmentWorkflowStepIds {
    type: string
    value: string[]
    source: string
    hierarchy: [string, string[]][]
    description: string
  }
  
  export interface OmegaTrClaimableJobStepAssignmentWorkflowStepIds {
    type: string
    value: any[]
    source: string
    hierarchy: [string, any[]][]
    description: string
  }
  
  export interface OmegaPmTriggerNewDraftTranslationJobsAutomatically {
    type: string
    value: boolean
    source: string
    hierarchy: [string, boolean][]
    description: string
  }
  
  export interface OmegaAuNotifyManagersWhenJobIsReadyForAssignToRecord {
    type: string
    value: boolean
    source: string
    hierarchy: [string, boolean][]
    description: string
  }
  
  export interface CuratedTranslationMemory {
    id: string
    "self-and-ancestors": string
  }
  
  export interface JobStep {
    "display-name": string
    id: string
    "job-lock-version": number
    "time-limit": TimeLimit
  }
  
  export interface TimeLimit {
    "ends-at": any
    "expiry-effects": any[]
  }
  
  export interface ProgressTracking {
    "has-progress-tracking": boolean
    progress: any[]
  }
  
  export interface SourceFile {
    "audio-file-url": string
    "content-type": string
    "date-code": string
    filename: string
    "git-commit": string
    "id-page": IdPage
    "language-code-3": any
    "product-identity-id": string
    stids: string[]
    "word-count": number
  }
  
  export interface IdPage {
    "paragraph-part-1": string
    "paragraph-part-2": string
    "paragraph-part-3": string
    title1: string
    title2: string
  }
  
  export interface WorkflowStep {
    "display-name": string
    id: string
  }
  
  export interface Block {
    "alleds-block/index": number
    audio: Audio
    classes: string[]
    stids: string[]
    "subtitle-pairs": Pair[]
    type: string
  }
  
  export interface Audio {
    "start-msec": number
    "duration-msec": number
  }
  
  export interface Pair {
    "alleds-subtitle-pair/stid": string
    "block-classes": string[]
    "block-el": string
    "block-index": number
    "completion-status": string
    source: Source
    stid: string
    target: Target
    validations: Validations
    "issue-attachments": Attachment[]
  }
  
  export interface Source {
    audio: Audio2
    "git-commit": string
    html: string
    "translation-suggestions": any[]
  }
  
  export interface Audio2 {
    "duration-msec"?: number
    "start-msec": number
  }
  
  export interface Target {
    "git-commit": string
    html: string
  }
  
  export interface Validations {
    "block-boundaries": BlockBoundaries
    eagles: Eagles
    formattings: Formattings
    "gap-marks": GapMarks
    "paragraph-numbers": ParagraphNumbers
    repositext: Repositext
  }
  
  export interface BlockBoundaries {
    source: number
    target: number
    valid: boolean
  }
  
  export interface Eagles {
    source: number
    target: number
    valid: boolean
  }
  
  export interface Formattings {
    source: string[]
    target: string[]
    valid: boolean
  }
  
  export interface GapMarks {
    source: number
    target: number
    valid: boolean
  }
  
  export interface ParagraphNumbers {
    source: string[]
    target: string[]
    valid: boolean
  }
  
  export interface Repositext {
    errors: any[]
    response: string
    valid: boolean
    warnings: string[]
    scope?: string
    stid?: string
    translation_job_id?: string
  }
  
  export interface Attachment {
    "comms-issue-attachment/id": string
    "attached-to-id": string
    "attached-to-type": string
    "attachment-details-path": string
    id: string
    issue: Issue
  }
  
  export interface Issue {
    "comms-issue/id": number
    assignee: Assignee
    "created-at": number
    "created-in-workspace-short-name": string
    description: string
    "display-number": string
    id: number
    "initial-workflow-step-name": string
    "issue-comments": Comment[]
    "issue-data": IssueData
    "issue-type-class": string
    "issue-type-instance-name": string
    "lock-version": number
    "number-and-title": string
    reporter: Reporter
    "requires-review": boolean
    resolution: string
    reviewer: Reviewer
    status: string
    "target-workflow-step": TargetWorkflowStep
    title: string
    "updated-at": number
  }
  
  export interface Assignee {
    "user/id": string
    id: string
    name: string
  }
  
  export interface Comment {
    "comms-issue-comment/id": string
    "created-at": number
    description: string
    id: string
    kind: string
    user: User
  }
  
  export interface User {
    "user/id": string
    id: string
    name: string
  }
  
  export interface IssueData {}
  
  export interface Reporter {
    "user/id": string
    id: string
    name: string
  }
  
  export interface Reviewer {
    "user/id": string
    id: string
    name: string
  }
  
  export interface TargetWorkflowStep {
    id: string
    name: string
  }
  
  export interface Policies {
    "auto-save": boolean
    "editor-modes": string[]
    "issue-assign-target-workflow-step?": boolean
    "issue-create?": boolean
    "issue-edit-stp?": boolean
    "job-reversal-create?": boolean
    "recording-corrections-pdf-url": any
    "test-populate-and-complete-all-captions?": boolean
  }
  
  export interface TargetFile {
    "id-page": IdPage2
  }
  
  export interface IdPage2 {
    "paragraph-part-1": string
    "paragraph-part-2": string
    "paragraph-part-3": string
    title1: string
    title2: string
  }
  
  export interface TargetLanguageChars {
    ampersand: string
    apostrophe: string
    close_parens: string
    close_square_bracket: string
    colon: string
    comma: string
    d_quote_close: string
    d_quote_open: string
    ellipsis: string
    ellquell: string
    em_dash: string
    exclamation_point: string
    open_parens: string
    open_square_bracket: string
    period: string
    question_mark: string
    s_quote_close: string
    s_quote_open: string
    semicolon: string
    subtitle_mark: string
  }
  