# Implementation Plan: Request Area & Upload Data Feature

## Goal Description
Implement a new "Request Area Coverage / Upload Pumps" feature. This will allow community members to actively contribute to expanding the map's coverage by requesting their specific area and uploading batch data (like a CSV or Excel list of petrol pumps).

## Proposed Changes

### 1. `src/components/RequestAreaModal.tsx` [NEW]
Create a new modal component similar to the existing `ReportModal.tsx`. It will contain:
- **Location Fields**: City and Pincode where coverage is requested.
- **File Upload**: A file input specifically for `.csv`, `.xlsx`, or `.json` to upload pump data.
- **Message/Notes**: An optional textarea for any context.
- **Submit Workflow**: A mock submission handler that displays a success state thanking the user for their contribution.

### 2. `src/components/Sidebar.tsx` [MODIFY]
- Add a prominent button in the sidebar (e.g., below the stats or at the bottom of the list) labeled **"Request Your Area"** or **"Upload Pump Data"**.

### 3. `src/app/page.tsx` [MODIFY]
- Introduce state to manage `isRequestAreaModalOpen`.
- Render the new `RequestAreaModal` component when open.
- Pass the open handler down to the `Sidebar`.

## Verification Plan
1. Create and integrate the modal into `page.tsx`.
2. Add the trigger button to `Sidebar.tsx`.
3. Verify the form accepts files and simulates a successful upload state.
