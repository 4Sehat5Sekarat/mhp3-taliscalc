const firstSkillIdSelect = document.getElementById("firstSkillId");
const secondSkillIdSelect = document.getElementById("secondSkillId");
const talisRarity = document.getElementById("talismanRarity");
const boxSlot = document.getElementById("boxSlot");

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

function populateTalisRarity(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((talis) => {
        const talisId = talis["id"];
        const talisName = talis["name"];

        const option = document.createElement("option");
        option.value = talisId;
        option.textContent = talisName;
        option.class = "talisRarity" + talisId;
        talisRarity.appendChild(option);
      });
    })
    .catch((err) => console.error("Error Loading Talisman rarity", err));
}

for (let i = 1; i <= 40; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = `Box Slot ` + i;
  boxSlot.appendChild(option);
}

// contoh pemanggilan
populateSkillOptionsFromFile("asset/skill.json");
populateTalisRarity("asset/talisman.json");
