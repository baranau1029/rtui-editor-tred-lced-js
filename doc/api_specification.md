API for the Translation/LineChecking editor

* UserPrompt
    * Acknowledge
        * Sometimes we display user prompts that require an acknowledgement by the user before they can continue to use the editor. This API call marks a UserPrompt as acknowledged on the server.
        * Code: src/cljs/rtui/ui/user_identity/events.cljs, line #7: :rtui.ui.user-identity.cmd/acknowledge-user-prompt
        * URL: PUT "/api/v1/user_identity/user_prompts/" user-prompt-id "/acknowledge"
* LineChecking: TranslationJob
    * Load for editing
        * Loads the translation job when the editor is first launched
        * Code: src/cljs/rtui/ui/lced/translation_job/events.cljs, line #12: :rtui.ui.lced.translation-job.cmd/load
        * URL: GET "/api/v1/line_checking/translation_jobs/" translation-job-id "/edit.json"
    * Mark as completed
        * Marks the translation job as completed (only possible if all captions are completed)
        * Code: src/cljs/rtui/ui/lced/translation_job/events.cljs, line #21: :rtui.ui.lced.translation-job.cmd/mark-as-completed
        * URL: PUT "/api/v1/line_checking/translation_jobs/" translation-job-id "/mark_as_completed.json"
    * Save
        * Saves updates to a TranslationJob back to the server
        * Code: src/cljs/rtui/ui/lced/translation_job/events.cljs, line #38: :rtui.ui.lced.translation-job.cmd/save
        * URL: PUT "/api/v1/line_checking/translation_jobs/" translation-job-id
* IssueComment
    * Create
        * Adds a new issue comment
        * Code: src/cljs/rtui/ui/comms/issue_comment/events.cljs, line #11: :rtui.ui.comms.issue-comment.cmd/add
        * URL: POST "/api/v1/comms/issues/" issue-id "/issue_comments/"
* IssueAttachments
    * apply-diff-to-stp
        * Applies a foreign text diff to the associated Caption
        * Code: src/cljs/rtui/ui/comms/issue_attachment/events.cljs, line #11: :rtui.comms.issue-attachment.cmd/apply-diff-to-stp
        * URL: PUT "/api/v1/comms/issue_attachments/" issue-attachment-id "/apply_diff_to_stp"
    * close
        * Closes the associated issue
        * Code: src/cljs/rtui/ui/comms/issue_attachment/events.cljs, line #28: :rtui.ui.comms.issue-attachment.cmd/close
        * URL: PUT "/api/v1/comms/issue_attachments/" issue-attachment-id "/close"
    * destroy-issue
        * Destroys the associated issue
        * Code: src/cljs/rtui/ui/comms/issue_attachment/events.cljs, line #47: :rtui.ui.comms.issue-attachment.cmd/destroy-issue
        * URL: DELETE "/api/v1/comms/issues/" issue-id
    * flag-for-review
        * Flags an Issue attachment for review
        * Code: src/cljs/rtui/ui/comms/issue_attachment/events.cljs, line #108: :rtui.ui.comms.issue-attachment.cmd/flag-for-review
        * URL: PUT "/api/v1/comms/issue_attachments/" issue-attachment-id "/flag_for_review"
    * mark-as-reviewed
        * Marks an issueAttachment as reviewed.
        * Code: src/cljs/rtui/ui/comms/issue_attachment/events.cljs, line #123 :rtui.ui.comms.issue-attachment.cmd/mark-as-reviewed
        * URL: PUT "/api/v1/comms/issue_attachments/" issue-attachment-id "/mark_as_reviewed"
    * reopen
        * Reopens a closed issue
        * Code: src/cljs/rtui/ui/comms/issue_attachment/events.cljs, line #138: :rtui.ui.comms.issue-attachment.cmd/reopen
        * URL: PUT "/api/v1/comms/issue_attachments/" issue-attachment-id "/reopen"
    * submit-edit-form
        * Updates an existing issueAttachment
        * Code: src/cljs/rtui/ui/comms/issue_attachment/events.cljs, line #153: :rtui.ui.comms.issue-attachment.cmd/submit-edit-form
        * URL: PUT "/api/v1/comms/issue_attachments/" issue-attachment-id
    * submit-new-form
        * Creates a new IssueAttachment
        * Code: src/cljs/rtui/ui/comms/issue_attachment/events.cljs, line #177: :rtui.ui.comms.issue-attachment.cmd/submit-new-form
        * URL: POST "/api/v1/comms/issue_attachments"
* SubtitlePair
    * validate-repositext
        * Validates a subtitle-pair by sending it to the server and applying server side validation rules.
        * Code: src/cljs/rtui/ui/tred/subtitle_pair/events.cljs, line #41: :rtui.ui.tred.subtitle-pair.cmd/validate-repositext
        * URL: POST "/api/v1/translation/translation_jobs/" translation-job-id "/subtitle_pairs/" stid "/validate"
* TranslationTools
    * report-suggestion-rejection-to-server
        * Reports the fact that a translation suggestion was rejected by the translator to the server
        * Code: src/cljs/rtui/ui/tred/translation_tools/events.cljs, line #33 :rtui.ui.tred.translation-tools.cmd/report-suggestion-rejection-to-server
        * URL: DELETE "/api/v1/translation/translation_memories/" curated-translation-memory-id "/translation_memory_units/report_rejection"
    * report-suggestion-use-to-server
        * Reports the fact that a translation suggestion was used by the translator to the server
        * Code: src/cljs/rtui/ui/tred/translation_tools/events.cljs, line #52 :rtui.ui.tred.translation-tools.cmd/report-suggestion-use-to-server
        * URL: POST "/api/v1/translation/translation_memories/" curated-translation-memory-id "/translation_memory_units/report_usage"
* Translation: TranslationJob
    * Load for editing
        * Loads the translation job when the editor is first launched
        * Code: src/cljs/rtui/ui/tred/translation_job/events.cljs, line #48: :rtui.ui.tred.translation-job.cmd/load
        * URL: GET "/api/v1/translation/translation_jobs/" translation-job-id "/edit.json"
    * Mark as completed
        * Marks the translation job as completed (only possible if all captions are completed)
        * Code: src/cljs/rtui/ui/tred/translation_job/events.cljs, line #57: :rtui.ui.tred.translation-job.cmd/mark-as-completed
        * URL: PUT "/api/v1/translation/translation_jobs/" translation-job-id "/mark_as_completed.json"
    * Save
        * Saves updates to a TranslationJob back to the server
        * Code: src/cljs/rtui/ui/tred/translation_job/events.cljs, line #74: :rtui.ui.tred.translation-job.cmd/save
        * URL: PUT "/api/v1/translation/translation_jobs/" translation-job-id
* AllEds: TranslationJob
    * revert-to-workflow-step
        * Reverts a TranslationJob to a previous workflow step
        * Code: src/cljs/rtui/ui/alleds/translation_job/events.cljs, line #46: :rtui.ui.alleds.translation-job.cmd/revert-to-workflow-step
        * URL: POST "/api/v1/pm/job_reversals"
    * sync-tj-lock-version
        * We use optimistic locking to handle race conditions. Sometimes a server response is not returned successfully. We use this API call to synchronize the TranslationJob lock versions between server and client.
        * Code: src/cljs/rtui/ui/alleds/translation_job/events.cljs, line #61: :rtui.ui.alleds.translation-job.cmd/sync-tj-lock-version
        * URL: GET "/api/v1/translation/translation_jobs/" translation-job-id "/sync_client_tj_lock_version"
