"use client";

import * as React from "react";
import {
  createEmptyJournalPost,
  slugify,
} from "../utils";
import {
  SplitEditor,
  SectionHeader,
  Grid,
  Field,
  EmptyEditor,
  ImageUploadField,
} from "../ui/AdminUI";

interface JournalTabProps {
  journalPosts: any[];
  selectedJournal: number;
  setSelectedJournal: (index: number) => void;
  addArrayItem: (section: string, item: any) => void;
  removeArrayItem: (section: string, index: number) => void;
  updateArrayItem: (section: string, index: number, updater: (item: any) => any) => void;
}

export default function JournalTab({
  journalPosts,
  selectedJournal,
  setSelectedJournal,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
}: JournalTabProps) {
  const currentJournal = journalPosts[selectedJournal];

  return (
    <SplitEditor
      listTitle="Journal posts"
      listItems={journalPosts}
      selectedIndex={selectedJournal}
      onSelect={setSelectedJournal}
      onAdd={() => {
        addArrayItem("JOURNAL_POSTS", createEmptyJournalPost());
        setSelectedJournal(journalPosts.length);
      }}
      onRemove={() => removeArrayItem("JOURNAL_POSTS", selectedJournal)}
      renderLabel={(item) => item.title || "Untitled post"}
      emptyMessage="No journal posts yet."
    >
      {currentJournal ? (
        <div style={{ display: "grid", gap: 16 }}>
          <SectionHeader
            eyebrow="Journal editor"
            title={currentJournal.title || "Story details"}
            body="Edit story title, type, date, image, and short excerpt."
          />

          <ImageUploadField
            label="Story Cover Image"
            value={currentJournal.img || ""}
            onChange={(value) =>
              updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                ...item,
                img: value,
              }))
            }
          />

          <Grid columns={4}>
            <Field
              label="Title"
              value={currentJournal.title || ""}
              onChange={(value) =>
                updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                  ...item,
                  title: value,
                }))
              }
            />
            <Field
              label="ID / Slug"
              value={currentJournal.id || ""}
              onChange={(value) =>
                updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                  ...item,
                  id: slugify(value, "journal"),
                  slug: slugify(value, "journal"),
                }))
              }
            />
            <Field
              label="Kind"
              value={currentJournal.kind || ""}
              onChange={(value) =>
                updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                  ...item,
                  kind: value,
                }))
              }
            />
            <Field
              label="Date"
              value={currentJournal.date || ""}
              onChange={(value) =>
                updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                  ...item,
                  date: value,
                }))
              }
            />
          </Grid>
          <Field
            label="Excerpt"
            value={currentJournal.excerpt || ""}
            onChange={(value) =>
              updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                ...item,
                excerpt: value,
              }))
            }
            multiline
          />
          <Field
            label="Body (paragraphs separated by blank lines; use > for pull quotes, ### for subheadings)"
            value={currentJournal.body || ""}
            onChange={(value) =>
              updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                ...item,
                body: value,
              }))
            }
            multiline
            rows={12}
          />
        </div>
      ) : (
        <EmptyEditor message="Select or add a journal post to edit it." />
      )}
    </SplitEditor>
  );
}
