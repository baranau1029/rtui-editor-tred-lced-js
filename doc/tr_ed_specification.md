# TrEd Specification

This is the specification for the TranslationEditor (TrEd), as we migrate it from ClojureScript to a JS/TS implementation.

## Context

The TranslationEditor is used by translators to translate VGR documents from English to a foreign language. All VGR documents (sermons and CAB) are organized in captions. Each English caption has a unique 7 digit numeric id, e.g. `4765376`. Translators translate from English into their language one caption at a time. This allows us to have the translation split into caption by the time the translator is done with their translation work.

When a translator leaves the current caption, TrEd runs some validations to make sure everything is ok:

* client side validations
* server side validations

Depending on the validation status, we may show a yellow (warning) or red (error) indication. If a caption has errors it cannot be marked as completed.

As a translator works on the translation, TrEd automatically saves the current job back to the server at regular intervals. A translator can also manually save their work using the "Save Job" button in the top bar.

When a translator has marked all captions as completed, they can mark the entire job as completed. Once marked completed, a translator cannot access the job any more and it proceeds in the workflow.

During review steps, a reviewer can add issues to any caption. These issues will have to be resolved at later steps for the job to proceed through the workflow.

## Glossary

Some terms that we use in the context of TrEd:

* Eagle: A special character at the beginning and end of every sermon. It requires a special font to be installed for it to be visible.
* Gap Mark: We use a percent sign (`%`) to indicate
* Subtitle Mark: We use an at sign (`@`) to indicate the start of each caption.
* Caption: The text that is shown as subtitles as the sermon audio is played. Each caption starts with a subtitle mark (`@`). A caption cannot have more than 120 characters. English and foreign captions are aligned.
* Workspace: We organize the Omega software into the following workspaces:
    * Translation (TR): This is about translating English text into a foreign language.
    * ForeignEditing (FE): This is about making non-translation changes to foreign text. We may do this to fix formatting errors, or misspellings, or to move subtitle marks.
    * LineChecking (LC): This is about quality assurance: Text is formatted properly, all expected punctuation marks are present, etc. LineChecking may add issues to captions that need to be addressed by translators in later workflow steps.
* Issue: An issue can be attached to any caption to communicate with other workers in the workflow. E.g., a review could ask a question about a translation to the translator, or a Line Checker may flag an area of concern.
* Issue resolution: An issue may be resolved in the following ways:
    * Fixed: A change was made to address the concern in the issue.
    * Stet: It means "Leave as is". The text stays as is, not addressing the issue, but that is OK.
    * Unresolved: The issue has not been resolved.
* Workflow
* Job
* JobStep
* TranslationJob

## Overall workflow

Below is an outline of the overall translation workflow. JobSteps that use TrEd are in italics:

* B: Translation Draft
    * *Create Translation Draft*
    * B: Translation Draft - Team Customization
        * *Translation Draft Review 1A*
        * *Translation Draft Review 1B*
        * *Translation Draft Review 2A*
        * *Translation Draft Review 2B*
        * Merge 1 Then 1 Additional Reviews Of Draft Translation
    * Pause Job
    * *Translation Draft Proof*
    * * Apply Spots*
    * * Apply English Changes*
    * *Text Dept Import Review*
    * Translation Draft Complete
* C: Line Checking
    * Assign LC Job
    * Fast Track Review
    * Line Check Translation
    * Review LC Issues
* D: Final Proof
    * *Final Proof Translation*
    * *Proof Final Corrections*
    * *Comprehensive Manuscript Review*
    * *Text Dept Final Proof Review*
    * Final Proof Complete
* E: Recording
    * Assign To Record
    * E: Recording - Text
        * Submit Recording Corrections
        * Review Recording Corrections
        * *Enter Recording Corrections*
        * *Proof Recording Corrections*
        * *Text Dept Recording Corrections Review*
        * *Text Dept No Recording Corrections Review *
* Filed Completed Manuscript

## TranslationEditor UI

### Editor behaviors

* Edit Mode
    * In edit mode we show each caption individually.
    * Jump to caption: There are four buttons that let you jump to specific captions:
        * Pending: Jumps to the next pending (not completed) caption.
        * Invalid: Jumps to the next caption that has validation errors (not warnings!).
        * Top: Jumps to the first caption
        * Bottom: Jumps to the last caption
    * Jump to issue: There are 3 buttons that let you jump to specific issues:
        * Filtered: Jumps to the next issue that matches the current filter settings (see "Filter issues")
        * Open: Jumps to the next open issue (this is an issue that hasn't been closed yet).
        * To be resolved: Jumps to the next issue that has to be resolved at the current JobStep.
    * Filter issues: There are two groups of checkboxes to filter which issues are displayed:
        * By Workspace:
            * TR: Issues that were created in the translation workspace.
            * FE: Issues that were created in the foreign editing workspace.
            * LC: Issues that were created in the line checking workspace.
        * By Resolution:
            * Fixed: Issues that are fixed.
            * Stet: Issues that will not be fixed, but will be left as is.
            * Unresolved: Issues that are not resolved.
    * Current Caption: You can select one caption to be the current one. It is indicated by having an editor area, and a yellow background. The information displayed in the sidebar refers to the current caption.
        * You can navigate to another caption by
            * pressing `tab` to go to the next caption.
            * pressing `shift` + `tab` to go to the previous caption.
            * pressing `alt` + `enter` to mark the current caption as completed and go to the next caption.
        * You can play any caption's audio by hovering over the caption and pressing the play button.
        * The circle to the right of the caption indicates the completion status: Empty circle is pending, check mark in green circle indicates completed. A red triangle indicates an error that prevents this caption from being completed. Error conditions can be a missing eagle character or a missing gap mark character. The error cause is displayed in red. You can click on the text `Gap marks 0/1` to insert a gap mark at the current cursor position. Please note that manually entering a percent sign will not work! You have to click on the Gap mark or eagle error message to insert the correct character (it displays as a percent sign, however, for the editor it is a special character).
        * A yellow triangle indicates that there are validation warnings on the caption. You can hover over the triangle on any caption to see the warning messages. Warning messages for the current caption are displayed in the sidebar. You can still mark a caption as complete if it has warnings.
        * When you navigate away from a caption, we run some validations to check if the caption contents are as expected:
            * There are client side validations that are run instantly.
            * We also send the current caption to the server for a server side validation, e.g., for language specific punctuation rules.
        * The following information is displayed in the sidebar for the current caption:
            * Element type and css classes for the containing block level element, e.g., `<p>` or `<h1>`. Example: `P normal_pn`
            * Number of gap marks: Green if foreign caption contains correct number of gap marks, red if foreign contains incorrect number of gap marks. You can insert any missing gap marks at the current cursor position by clicking on this red error message.
            * Number of eagle characters: Green if foreign caption contains correct number of eagles, red if not. You can insert any missing eagles at the current cursor position by clicking on the red error message.
            * Status: `pending` or `completed`
            * Audio start: The time in minutes and seconds at which this caption starts in the audio recording.
            * "New issue" button. Use this button to create a new issue on the current caption.
            * Validation warnings are displayed at the bottom of the sidebar.
    * Top toolbar
        * Language and date code for the current sermon, e.g., `BUL65-1121` for the Bulgarian translation of the sermon from November 21, 1965.
        * Formatting buttons to apply formatting to selected text in the current caption.
        * "Save Translation Job" button to save the current work.
        * "Edit" mode button: To select edit mode.
        * "Review" mode button: To select review mode.
        * "Translation Job Info" button: To display a modal with info for the current TranslationJob:
            * Some info and stats for the current job
            * Which JobStep in the workflow
            * Option to mark the job as completed if there are no blockers. Otherwise information on why the job cannot be completed.
            * Option to revert the job if possible.
* Review Mode
    * In review mode we show the text in normal paragraph display mode, not as individual captions.
