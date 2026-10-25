import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "./ui/questionnaire";
import { getIssueOptions } from "../data/appliances";
import { useRepairStore } from "../store/repair-store";

export function RepairQuestionnaire({ appliance, onComplete }) {
  const setAnswers = useRepairStore((state) => state.setAnswers);
  const items = [
    {
      name: "issue",
      required: true,
      prompt: "What’s the problem?",
      description: "Choose the closest symptom, or write your own.",
      choices: getIssueOptions(appliance).filter((issue) => issue !== "Other (describe it)").map((issue) => ({ value: issue, label: issue })),
      input: { label: "Other", placeholder: "Type your own answer…" },
    },
    {
      name: "howItHappened",
      required: false,
      prompt: "How did it happen?",
      description: "This helps the master arrive prepared.",
      choices: ["Suddenly stopped", "Started making noise", "After a power outage", "After a move or repair", "Not sure"].map((value) => ({ value, label: value })),
      input: { label: "Other", placeholder: "Type your own answer…" },
    },
    {
      name: "whenStarted",
      required: false,
      prompt: "When did it start?",
      description: "An estimate is fine.",
      choices: ["Today", "This week", "Longer ago", "Not sure"].map((value) => ({ value, label: value })),
      input: { label: "Other", placeholder: "Type your own answer…" },
    },
    {
      name: "brand",
      required: false,
      prompt: "Which brand?",
      description: "Choose a brand if you know it.",
      choices: ["Samsung", "LG", "Whirlpool", "GE", "Bosch"].map((value) => ({ value, label: value })),
      input: { label: "Other", placeholder: "Type your own answer…" },
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const answers = Object.fromEntries(form.entries());
    setAnswers({ ...answers, issue: answers.issue || "Other (describe it)" });
    onComplete?.(answers);
  };

  return (
    <Questionnaire className="repair-questionnaire" items={items} onSubmit={handleSubmit}>
      <QuestionnaireProgress />
      {items.map((item) => (
        <QuestionnaireItem key={item.name} name={item.name} required={item.required}>
          <QuestionnaireTitle>{item.prompt}</QuestionnaireTitle>
          <QuestionnaireDescription>{item.description}</QuestionnaireDescription>
          <QuestionnaireChoices>
            {item.choices.map((choice) => (
              <QuestionnaireChoice key={choice.value} value={choice.value}>
                {choice.label}
              </QuestionnaireChoice>
            ))}
            <QuestionnaireInput aria-label={item.input.label} placeholder={item.input.placeholder} />
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
      ))}
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Continue</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
