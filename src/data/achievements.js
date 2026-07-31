// Fallback numbers, shown instantly and while live API calls (GitHub / LeetCode)
// are in flight or unavailable. Update the fallbacks to keep them realistic.
export const statFallbacks = {
  problemsSolved: 250,
  githubRepos: 20,
  projectsBuilt: 12,
  technologiesLearned: 15,
};

export const stats = [
  { id: "problemsSolved", label: "Problems Solved", suffix: "+" },
  { id: "githubRepos", label: "GitHub Repositories", suffix: "+" },
  { id: "projectsBuilt", label: "Projects Built", suffix: "+" },
  { id: "technologiesLearned", label: "Technologies Learned", suffix: "+" },
];
