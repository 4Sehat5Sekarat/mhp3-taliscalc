const firstSkillIdSelect = document.getElementById("firstSkillId");
const secondSkillIdSelect = document.getElementById("secondSkillId");

function populateSkillOptionsFromFile(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((skill) => {
        const skillValue = skill["Skill ID"];
        const skillText = skill["Skill Name"]["MHP3HD Patch"];

        const firstOption = document.createElement("option");
        firstOption.value = skillValue;
        firstOption.textContent = skillText;
        firstSkillIdSelect.appendChild(firstOption);

        const secondOption = document.createElement("option");
        secondOption.value = skillValue;
        secondOption.textContent = skillText;
        secondSkillIdSelect.appendChild(secondOption);
      });
    })
    .catch((err) => console.error("Error loading skills:", err));
}

// contoh pemanggilan
populateSkillOptionsFromFile("../asset/skill.json");
