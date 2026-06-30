"use client";

import * as React from "react";
import {
  createEmptyActivityGroup,
  createEmptyFaq,
  createEmptyReview,
  createEmptyJournalPost,
  slugify,
  parseNumber,
  formatLines,
  parseLines,
  panelStyle,
  buttonStyle,
  ADMIN_UI,
} from "../utils";
import {
  SplitEditor,
  SectionHeader,
  Grid,
  Field,
  SubsectionTitle,
  EmptyEditor,
  InlineChecks,
  CheckField,
  ImageUploadField,
} from "../ui/AdminUI";

interface ContentTabProps {
  draftContent: any;
  contentTab: string;
  setContentTab: (tab: string) => void;
  updateDraft: (updater: any) => void;
  updateArrayItem: (section: string, index: number, updater: (item: any) => any) => void;
  addArrayItem: (section: string, item: any) => void;
  removeArrayItem: (section: string, index: number) => void;
  activities: any[];
  selectedActivity: number;
  setSelectedActivity: (index: number) => void;
  faqs: any[];
  selectedFaq: number;
  setSelectedFaq: (index: number) => void;
  termsContent: any;
  termSections: any[];
  selectedTermsSection: number;
  setSelectedTermsSection: (index: number) => void;
  addTermsSection: () => void;
  removeTermsSection: (index: number) => void;
  updateTermsSection: (index: number, updater: (item: any) => any) => void;
  journalPosts: any[];
  selectedJournal: number;
  setSelectedJournal: (index: number) => void;
  reviews: any[];
  selectedReview: number;
  setSelectedReview: (index: number) => void;
  currencyEntries: any[];
  selectedCurrency: number;
  setSelectedCurrency: (index: number) => void;
  addCurrencyEntry: () => void;
  removeCurrencyEntry: (key: string) => void;
  updateCurrencyEntry: (key: string, field: string, value: any) => void;
}

export default function ContentTab({
  draftContent,
  contentTab,
  setContentTab,
  updateDraft,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  activities,
  selectedActivity,
  setSelectedActivity,
  faqs,
  selectedFaq,
  setSelectedFaq,
  termsContent,
  termSections,
  selectedTermsSection,
  setSelectedTermsSection,
  addTermsSection,
  removeTermsSection,
  updateTermsSection,
  journalPosts,
  selectedJournal,
  setSelectedJournal,
  reviews,
  selectedReview,
  setSelectedReview,
  currencyEntries,
  selectedCurrency,
  setSelectedCurrency,
  addCurrencyEntry,
  removeCurrencyEntry,
  updateCurrencyEntry,
}: ContentTabProps) {
  const currentActivity = activities[selectedActivity];
  const currentFaq = faqs[selectedFaq];
  const currentTermsSection = termSections[selectedTermsSection];
  const currentJournal = journalPosts[selectedJournal];
  const currentReview = reviews[selectedReview];
  const currentCurrencyEntry = currencyEntries[selectedCurrency];

  return (
    <section style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { id: "today", label: "Today Panel (Home)" },
          { id: "activities", label: "The Farm (Activities)" },
          { id: "faq", label: "FAQs" },
          { id: "terms", label: "Policies / Terms" },
          { id: "journal", label: "Journal" },
          { id: "volunteer", label: "Volunteer" },
          { id: "reviews", label: "Reviews" },
          { id: "pricing", label: "Currencies" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setContentTab(item.id)}
            style={{
              borderRadius: 999,
              padding: "10px 16px",
              border:
                "1px solid " +
                (contentTab === item.id
                  ? "var(--ink)"
                  : "var(--rule)"),
              background:
                contentTab === item.id
                  ? "var(--ink)"
                  : "transparent",
              color:
                contentTab === item.id ? "var(--paper)" : "var(--ink-2)",
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "inherit",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {contentTab === "today" && (
        <section style={{ ...panelStyle(), padding: 24 }}>
          <SectionHeader
            eyebrow="Today panel"
            title="Homepage daily snapshot"
            body="Edit the small farm update section: date, weather, growing list, cooking list, and from-farm note."
          />

          <SubsectionTitle title="Culinary & Homepage Section Images" />
          <div style={{ display: "grid", gap: 16, marginBottom: 28 }}>
            <ImageUploadField
              label="Culinary Section Image (cooking1)"
              value={draftContent.IMG?.cooking1 || ""}
              onChange={(value) =>
                updateDraft((next: any) => {
                  next.IMG = { ...(next.IMG || {}), cooking1: value };
                  return next;
                })
              }
            />
            <ImageUploadField
              label="Homepage Poster Image (cooking2)"
              value={draftContent.IMG?.cooking2 || ""}
              onChange={(value) =>
                updateDraft((next: any) => {
                  next.IMG = { ...(next.IMG || {}), cooking2: value };
                  return next;
                })
              }
            />
            <ImageUploadField
              label="Cooking Focus Feature Image (cooking3)"
              value={draftContent.IMG?.cooking3 || ""}
              onChange={(value) =>
                updateDraft((next: any) => {
                  next.IMG = { ...(next.IMG || {}), cooking3: value };
                  return next;
                })
              }
            />
          </div>

          <Grid columns={3}>
            <Field
              label="Date label"
              value={draftContent.TODAY_PANEL?.date || ""}
              onChange={(value) =>
                updateDraft((next: any) => {
                  next.TODAY_PANEL = {
                    ...(next.TODAY_PANEL || {}),
                    date: value,
                  };
                  return next;
                })
              }
            />
            <Field
              label="Weather"
              value={draftContent.TODAY_PANEL?.weather || ""}
              onChange={(value) =>
                updateDraft((next: any) => {
                  next.TODAY_PANEL = {
                    ...(next.TODAY_PANEL || {}),
                    weather: value,
                  };
                  return next;
                })
              }
            />
            <Field
              label="From farm note"
              value={draftContent.TODAY_PANEL?.fromFarm || ""}
              onChange={(value) =>
                updateDraft((next: any) => {
                  next.TODAY_PANEL = {
                    ...(next.TODAY_PANEL || {}),
                    fromFarm: value,
                  };
                  return next;
                })
              }
            />
          </Grid>
          <Field
            label="Growing now"
            hint="One item per line"
            value={formatLines(draftContent.TODAY_PANEL?.growing)}
            onChange={(value) =>
              updateDraft((next: any) => {
                next.TODAY_PANEL = {
                  ...(next.TODAY_PANEL || {}),
                  growing: parseLines(value),
                };
                return next;
              })
            }
            multiline
            rows={5}
          />
          <Field
            label="Cooking now"
            hint="One item per line"
            value={formatLines(draftContent.TODAY_PANEL?.cooking)}
            onChange={(value) =>
              updateDraft((next: any) => {
                next.TODAY_PANEL = {
                  ...(next.TODAY_PANEL || {}),
                  cooking: parseLines(value),
                };
                return next;
              })
            }
            multiline
            rows={5}
          />
        </section>
      )}

      {contentTab === "activities" && (
        <SplitEditor
          listTitle="Activity groups"
          listItems={activities}
          selectedIndex={selectedActivity}
          onSelect={setSelectedActivity}
          onAdd={() => {
            addArrayItem("ACTIVITIES", createEmptyActivityGroup());
            setSelectedActivity(activities.length);
          }}
          onRemove={() => removeArrayItem("ACTIVITIES", selectedActivity)}
          renderLabel={(item) => item.group || "Untitled group"}
          emptyMessage="No activity groups yet."
        >
          {currentActivity ? (
            <div style={{ display: "grid", gap: 16 }}>
              <SectionHeader
                eyebrow="Activity group"
                title={currentActivity.group || "Group details"}
                body="Group related farm or local experiences together and edit each item inside the group."
              />

              <SubsectionTitle title="Sightseeing & Wander Images" />
              <div style={{ display: "grid", gap: 16, marginBottom: 12 }}>
                <ImageUploadField
                  label="Wander Lorry Image (truck)"
                  value={draftContent.IMG?.truck || ""}
                  onChange={(value) =>
                    updateDraft((next: any) => {
                      next.IMG = { ...(next.IMG || {}), truck: value };
                      return next;
                    })
                  }
                />
                <ImageUploadField
                  label="Local Sightseeing Image (temple)"
                  value={draftContent.IMG?.temple || ""}
                  onChange={(value) =>
                    updateDraft((next: any) => {
                      next.IMG = { ...(next.IMG || {}), temple: value };
                      return next;
                    })
                  }
                />
                <ImageUploadField
                  label="Local Heritage Image (church)"
                  value={draftContent.IMG?.church || ""}
                  onChange={(value) =>
                    updateDraft((next: any) => {
                      next.IMG = { ...(next.IMG || {}), church: value };
                      return next;
                    })
                  }
                />
                <ImageUploadField
                  label="Stay / Tour Highlights Image (tour2)"
                  value={draftContent.IMG?.tour2 || ""}
                  onChange={(value) =>
                    updateDraft((next: any) => {
                      next.IMG = { ...(next.IMG || {}), tour2: value };
                      return next;
                    })
                  }
                />
              </div>

              <Field
                label="Group title"
                value={currentActivity.group || ""}
                onChange={(value) =>
                  updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                    ...item,
                    group: value,
                  }))
                }
              />
              <div style={{ display: "grid", gap: 12 }}>
                {(currentActivity.items || []).map((activityItem: any, index: number) => (
                  <div
                    key={`${activityItem.title}-${index}`}
                    style={{
                      ...panelStyle(),
                      padding: 16,
                      background: "var(--paper)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <div className="mono tracked" style={{ color: "var(--muted)" }}>
                        Activity {index + 1}
                      </div>
                      <button
                        onClick={() =>
                          updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                            ...item,
                            items: (item.items || []).filter(
                              (_: any, itemIndex: number) => itemIndex !== index,
                            ),
                          }))
                        }
                        style={buttonStyle("danger")}
                      >
                        Remove
                      </button>
                    </div>
                    <Field
                      label="Title"
                      value={activityItem.title || ""}
                      onChange={(value) =>
                        updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                          ...item,
                          items: (item.items || []).map((entry: any, itemIndex: number) =>
                            itemIndex === index
                              ? { ...entry, title: value }
                              : entry,
                          ),
                        }))
                      }
                    />
                    <Field
                      label="Description"
                      value={activityItem.body || ""}
                      onChange={(value) =>
                        updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                          ...item,
                          items: (item.items || []).map((entry: any, itemIndex: number) =>
                            itemIndex === index
                              ? { ...entry, body: value }
                              : entry,
                          ),
                        }))
                      }
                      multiline
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() =>
                  updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                    ...item,
                    items: [
                      ...(item.items || []),
                      { title: "", body: "" },
                    ],
                  }))
                }
                style={buttonStyle("ghost")}
              >
                Add activity item
              </button>
            </div>
          ) : (
            <EmptyEditor message="Select or add an activity group to edit it." />
          )}
        </SplitEditor>
      )}

      {contentTab === "faq" && (
        <SplitEditor
          listTitle="FAQs"
          listItems={faqs}
          selectedIndex={selectedFaq}
          onSelect={setSelectedFaq}
          onAdd={() => {
            addArrayItem("FAQS", createEmptyFaq());
            setSelectedFaq(faqs.length);
          }}
          onRemove={() => removeArrayItem("FAQS", selectedFaq)}
          renderLabel={(item) => item.q || "Untitled question"}
          emptyMessage="No FAQs yet."
        >
          {currentFaq ? (
            <div style={{ display: "grid", gap: 16 }}>
              <SectionHeader
                eyebrow="FAQ editor"
                title="Question and answer"
                body="Keep common visitor questions up to date here."
              />
              <Field
                label="Question"
                value={currentFaq.q || ""}
                onChange={(value) =>
                  updateArrayItem("FAQS", selectedFaq, (item) => ({
                    ...item,
                    q: value,
                  }))
                }
              />
              <Field
                label="Answer"
                value={currentFaq.a || ""}
                onChange={(value) =>
                  updateArrayItem("FAQS", selectedFaq, (item) => ({
                    ...item,
                    a: value,
                  }))
                }
                multiline
                rows={6}
              />
            </div>
          ) : (
            <EmptyEditor message="Select or add an FAQ to edit it." />
          )}
        </SplitEditor>
      )}

      {contentTab === "terms" && (
        <div style={{ display: "grid", gap: 18 }}>
          <section style={{ ...panelStyle(), padding: 24 }}>
            <SectionHeader
              eyebrow="Terms editor"
              title="Terms and conditions page"
              body="Manage the legal page title, intro copy, date label, and closing acknowledgement."
            />
            <Grid columns={2}>
              <Field
                label="Page title"
                value={termsContent.title || ""}
                onChange={(value) =>
                  updateDraft((next: any) => {
                    next.TERMS = {
                      ...(next.TERMS || {}),
                      title: value,
                    };
                    return next;
                  })
                }
              />
              <Field
                label="Last updated"
                value={termsContent.lastUpdated || ""}
                onChange={(value) =>
                  updateDraft((next: any) => {
                    next.TERMS = {
                      ...(next.TERMS || {}),
                      lastUpdated: value,
                    };
                    return next;
                  })
                }
              />
            </Grid>
            <Field
              label="Intro"
              value={termsContent.intro || ""}
              onChange={(value) =>
                updateDraft((next: any) => {
                  next.TERMS = {
                    ...(next.TERMS || {}),
                    intro: value,
                  };
                  return next;
                })
              }
              multiline
              rows={6}
            />
            <Field
              label="Acknowledgement"
              value={termsContent.acknowledgement || ""}
              onChange={(value) =>
                updateDraft((next: any) => {
                  next.TERMS = {
                    ...(next.TERMS || {}),
                    acknowledgement: value,
                  };
                  return next;
                })
              }
              multiline
              rows={5}
            />
          </section>

          <SplitEditor
            listTitle="Terms clauses"
            listItems={termSections}
            selectedIndex={selectedTermsSection}
            onSelect={setSelectedTermsSection}
            onAdd={addTermsSection}
            onRemove={() => removeTermsSection(selectedTermsSection)}
            renderLabel={(item) => item.title || "Untitled clause"}
            emptyMessage="No terms clauses yet."
          >
            {currentTermsSection ? (
              <div style={{ display: "grid", gap: 16 }}>
                <SectionHeader
                  eyebrow="Clause editor"
                  title={currentTermsSection.title || "Clause details"}
                  body="Edit each terms section individually so the public page stays readable."
                />
                <Field
                  label="Clause title"
                  value={currentTermsSection.title || ""}
                  onChange={(value) =>
                    updateTermsSection(selectedTermsSection, (item) => ({
                      ...item,
                      title: value,
                    }))
                  }
                />
                <Field
                  label="Clause body"
                  value={currentTermsSection.body || ""}
                  onChange={(value) =>
                    updateTermsSection(selectedTermsSection, (item) => ({
                      ...item,
                      body: value,
                    }))
                  }
                  multiline
                  rows={8}
                />
              </div>
            ) : (
              <EmptyEditor message="Select or add a terms clause to edit it." />
            )}
          </SplitEditor>
        </div>
      )}

      {contentTab === "volunteer" && (
        <div style={{ display: "grid", gap: 18 }}>
          <section style={{ ...panelStyle(), padding: 24 }}>
            <SectionHeader
              eyebrow="Volunteer settings"
              title="Volunteer with Us page"
              body="Manage title, description, benefits, requirements, and rhythm of the volunteering page."
            />

            <div style={{ marginBottom: 20 }}>
              <ImageUploadField
                label="Volunteer Hero Image"
                value={draftContent.VOLUNTEER?.heroImg || ""}
                onChange={(value) =>
                  updateDraft((next: any) => {
                    next.VOLUNTEER = {
                      ...(next.VOLUNTEER || {}),
                      heroImg: value,
                    };
                    return next;
                  })
                }
              />
            </div>

            <Grid columns={2}>
              <Field
                label="Eyebrow"
                value={draftContent.VOLUNTEER?.eyebrow || ""}
                onChange={(value) =>
                  updateDraft((next: any) => {
                    next.VOLUNTEER = {
                      ...(next.VOLUNTEER || {}),
                      eyebrow: value,
                    };
                    return next;
                  })
                }
              />
              <Field
                label="Page title"
                value={draftContent.VOLUNTEER?.title || ""}
                onChange={(value) =>
                  updateDraft((next: any) => {
                    next.VOLUNTEER = {
                      ...(next.VOLUNTEER || {}),
                      title: value,
                    };
                    return next;
                  })
                }
              />
              <ImageUploadField
                label="Hero image path"
                value={draftContent.VOLUNTEER?.heroImg || ""}
                onChange={(value) =>
                  updateDraft((next: any) => {
                    next.VOLUNTEER = {
                      ...(next.VOLUNTEER || {}),
                      heroImg: value,
                    };
                    return next;
                  })
                }
              />
            </Grid>
            <Field
              label="Introduction text"
              value={draftContent.VOLUNTEER?.introText || ""}
              onChange={(value) =>
                updateDraft((next: any) => {
                  next.VOLUNTEER = {
                    ...(next.VOLUNTEER || {}),
                    introText: value,
                  };
                  return next;
                })
              }
              multiline
              rows={4}
            />
            <Grid columns={2}>
              <Field
                label="CTA Title"
                value={draftContent.VOLUNTEER?.ctaTitle || ""}
                onChange={(value) =>
                  updateDraft((next: any) => {
                    next.VOLUNTEER = {
                      ...(next.VOLUNTEER || {}),
                      ctaTitle: value,
                    };
                    return next;
                  })
                }
              />
              <Field
                label="CTA Text"
                value={draftContent.VOLUNTEER?.ctaText || ""}
                onChange={(value) =>
                  updateDraft((next: any) => {
                    next.VOLUNTEER = {
                      ...(next.VOLUNTEER || {}),
                      ctaText: value,
                    };
                    return next;
                  })
                }
              />
            </Grid>

            <SubsectionTitle title="Requirements (What we expect)" />
            <div style={{ display: "grid", gap: 14 }}>
              {(draftContent.VOLUNTEER?.requirements || []).map((req: any, idx: number) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, alignItems: "start" }}>
                  <Field
                    label={`Req #${idx + 1} Title`}
                    value={req.title || ""}
                    onChange={(value) =>
                      updateDraft((next: any) => {
                        const requirements = [...(next.VOLUNTEER?.requirements || [])];
                        requirements[idx] = { ...(requirements[idx] || {}), title: value };
                        next.VOLUNTEER.requirements = requirements;
                        return next;
                      })
                    }
                  />
                  <Field
                    label={`Req #${idx + 1} Description`}
                    value={req.description || ""}
                    onChange={(value) =>
                      updateDraft((next: any) => {
                        const requirements = [...(next.VOLUNTEER?.requirements || [])];
                        requirements[idx] = { ...(requirements[idx] || {}), description: value };
                        next.VOLUNTEER.requirements = requirements;
                        return next;
                      })
                    }
                  />
                </div>
              ))}
            </div>

            <SubsectionTitle title="Offerings (What we provide)" />
            <div style={{ display: "grid", gap: 14 }}>
              {(draftContent.VOLUNTEER?.whatWeProvide || []).map((prov: any, idx: number) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, alignItems: "start" }}>
                  <Field
                    label={`Offer #${idx + 1} Title`}
                    value={prov.title || ""}
                    onChange={(value) =>
                      updateDraft((next: any) => {
                        const whatWeProvide = [...(next.VOLUNTEER?.whatWeProvide || [])];
                        whatWeProvide[idx] = { ...(whatWeProvide[idx] || {}), title: value };
                        next.VOLUNTEER.whatWeProvide = whatWeProvide;
                        return next;
                      })
                    }
                  />
                  <Field
                    label={`Offer #${idx + 1} Description`}
                    value={prov.description || ""}
                    onChange={(value) =>
                      updateDraft((next: any) => {
                        const whatWeProvide = [...(next.VOLUNTEER?.whatWeProvide || [])];
                        whatWeProvide[idx] = { ...(whatWeProvide[idx] || {}), description: value };
                        next.VOLUNTEER.whatWeProvide = whatWeProvide;
                        return next;
                      })
                    }
                  />
                </div>
              ))}
            </div>

            <SubsectionTitle title="Daily Rhythm" />
            <div style={{ display: "grid", gap: 14 }}>
              {(draftContent.VOLUNTEER?.dailyRhythm || []).map((rhythm: any, idx: number) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, alignItems: "start" }}>
                  <Field
                    label={`Rhythm #${idx + 1} Time`}
                    value={rhythm.time || ""}
                    onChange={(value) =>
                      updateDraft((next: any) => {
                        const dailyRhythm = [...(next.VOLUNTEER?.dailyRhythm || [])];
                        dailyRhythm[idx] = { ...(dailyRhythm[idx] || {}), time: value };
                        next.VOLUNTEER.dailyRhythm = dailyRhythm;
                        return next;
                      })
                    }
                  />
                  <Field
                    label={`Rhythm #${idx + 1} Task`}
                    value={rhythm.task || ""}
                    onChange={(value) =>
                      updateDraft((next: any) => {
                        const dailyRhythm = [...(next.VOLUNTEER?.dailyRhythm || [])];
                        dailyRhythm[idx] = { ...(dailyRhythm[idx] || {}), task: value };
                        next.VOLUNTEER.dailyRhythm = dailyRhythm;
                        return next;
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {contentTab === "journal" && (
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
                <ImageUploadField
                  label="Image path"
                  value={currentJournal.img || ""}
                  onChange={(value) =>
                    updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                      ...item,
                      img: value,
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
      )}

      {contentTab === "reviews" && (
        <SplitEditor
          listTitle="Reviews"
          listItems={reviews}
          selectedIndex={selectedReview}
          onSelect={setSelectedReview}
          onAdd={() => {
            addArrayItem("REVIEWS", createEmptyReview());
            setSelectedReview(reviews.length);
          }}
          onRemove={() => removeArrayItem("REVIEWS", selectedReview)}
          renderLabel={(item) => item.author || "Untitled review"}
          emptyMessage="No reviews yet."
        >
          {currentReview ? (
            <div style={{ display: "grid", gap: 16 }}>
              <SectionHeader
                eyebrow="Review editor"
                title={currentReview.author || "Guest review"}
                body="Manage review source, star rating, short teaser, and full review text."
              />
              <Grid columns={3}>
                <Field
                  label="Guest name"
                  value={currentReview.author || ""}
                  onChange={(value) =>
                    updateArrayItem("REVIEWS", selectedReview, (item) => ({
                      ...item,
                      author: value,
                    }))
                  }
                />
                <Field
                  label="Source"
                  value={currentReview.location || ""}
                  onChange={(value) =>
                    updateArrayItem("REVIEWS", selectedReview, (item) => ({
                      ...item,
                      location: value,
                    }))
                  }
                />
                <Field
                  label="Date"
                  value={currentReview.stayDate || ""}
                  onChange={(value) =>
                    updateArrayItem("REVIEWS", selectedReview, (item) => ({
                      ...item,
                      stayDate: value,
                    }))
                  }
                />
                <Field
                  label="Stars"
                  value={currentReview.rating ?? ""}
                  onChange={(value) =>
                    updateArrayItem("REVIEWS", selectedReview, (item) => ({
                      ...item,
                      rating: parseNumber(value),
                    }))
                  }
                  inputMode="numeric"
                />
              </Grid>
              <Field
                label="Full review text"
                value={currentReview.text || ""}
                onChange={(value) =>
                  updateArrayItem("REVIEWS", selectedReview, (item) => ({
                    ...item,
                    text: value,
                  }))
                }
                multiline
                rows={6}
              />
            </div>
          ) : (
            <EmptyEditor message="Select or add a review to edit it." />
          )}
        </SplitEditor>
      )}

      {contentTab === "pricing" && (
        <SplitEditor
          listTitle="Currencies"
          listItems={currencyEntries}
          selectedIndex={selectedCurrency}
          onSelect={setSelectedCurrency}
          onAdd={addCurrencyEntry}
          onRemove={() =>
            currentCurrencyEntry
              ? removeCurrencyEntry(currentCurrencyEntry[0])
              : null
          }
          renderLabel={(item) => item[0]}
          emptyMessage="No currencies yet."
        >
          {currentCurrencyEntry ? (
            <div style={{ display: "grid", gap: 16 }}>
              <SectionHeader
                eyebrow="Currency editor"
                title={currentCurrencyEntry[0]}
                body="Edit the currency symbol, conversion rate, digits, display code, and label."
              />
              <Grid columns={3}>
                <Field
                  label="Symbol"
                  value={currentCurrencyEntry[1]?.symbol || ""}
                  onChange={(value) =>
                    updateCurrencyEntry(currentCurrencyEntry[0], "symbol", value)
                  }
                />
                <Field
                  label="Rate"
                  value={currentCurrencyEntry[1]?.rate ?? ""}
                  onChange={(value) =>
                    updateCurrencyEntry(
                      currentCurrencyEntry[0],
                      "rate",
                      parseNumber(value),
                    )
                  }
                  inputMode="decimal"
                />
                <Field
                  label="Digits"
                  value={currentCurrencyEntry[1]?.digits ?? ""}
                  onChange={(value) =>
                    updateCurrencyEntry(
                      currentCurrencyEntry[0],
                      "digits",
                      parseNumber(value),
                    )
                  }
                  inputMode="numeric"
                />
                <Field
                  label="Code"
                  value={currentCurrencyEntry[1]?.code || ""}
                  onChange={(value) =>
                    updateCurrencyEntry(currentCurrencyEntry[0], "code", value)
                  }
                />
                <Field
                  label="Label"
                  value={currentCurrencyEntry[1]?.label || ""}
                  onChange={(value) =>
                    updateCurrencyEntry(currentCurrencyEntry[0], "label", value)
                  }
                />
              </Grid>
            </div>
          ) : (
            <EmptyEditor message="Select or add a currency to edit it." />
          )}
        </SplitEditor>
      )}

    </section>
  );
}
