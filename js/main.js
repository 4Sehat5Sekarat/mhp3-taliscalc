const buttonCopy = document.getElementById("buttonCopy");
const buttonTheme = document.getElementById("buttonTheme");
const output = document.getElementById("output");

buttonCopy.addEventListener("click", copyResult);
buttonTheme.addEventListener("click", changeTheme);

function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;

  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #222;
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 9999;
  `;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}

//FIXME:proper way to copy
function copyResult() {
  const text = output.innerText || output.value;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
    showToast("copy oke!");
  } else {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);

    temp.select();
    temp.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(temp);
    showToast("Copy oke!");
  }
}

function changeTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}

function hex16(value) {
  return value.toString(16).toUpperCase().padStart(4, "0");
}

function calculateCodes({
  skill1Id = 0,
  skill2Id = 0,
  skill1Level = 0,
  skill2Level = 0,
  slot = 0,
  talismanId = 1,
  box = 1,
} = {}) {
  if (!skill1Level && !skill2Level) return "no level";

  const skillData = skill1Id + skill2Id * 128 + slot * 16384;
  const levelData =
    (skill1Level + 30) * 16 + (skill2Level + 30) * 1024 + talismanId - 1;

  if (levelData > 0xffff) return "too long";

  const address = 65032 + box * 12;

  return `
_L 0x2174${hex16(address)} 0x${hex16(levelData)}6501<br />
_L 0x2174${hex16(address + 4)} 0x0000${hex16(skillData)}`;
}

// TODO: Try this and implement it. and merge into calculateCodes because just different address
function calculateCodesULJM({
  skill1Id = 0,
  skill2Id = 0,
  skill1Level = 0,
  skill2Level = 0,
  slot = 0,
  talismanId = 1,
  box = 1,
} = {}) {
  if (!skill1Level && !skill2Level) return "no level";

  const skillData = skill1Id + skill2Id * 128 + slot * 16384;
  const levelData =
    (skill1Level + 30) * 16 + (skill2Level + 30) * 1024 + talismanId - 1;

  if (levelData > 0xffff) return "too long";

  const address = 65032 + box * 12;

  return `
_L 0x2134${hex16(address)} 0x${hex16(levelData)}6501<br />
_L 0x2134${hex16(address + 4)} 0x0000${hex16(skillData)}`;
}

function calculateValues() {
  const hash = window.location.hash;
  const byId = (id) => document.getElementById(id);

  const talisman = byId("talismanRarity");
  const firstSkill = byId("firstSkillId");
  const secondSkill = byId("secondSkillId");
  const firstLevel = byId("firstSkillLevel");
  const secondLevel = byId("secondSkillLevel");
  const slot = byId("numberOfSlot");
  const box = byId("boxSlot");

  const names = `_C0 ${talisman.selectedOptions[0].text} ${firstSkill.selectedOptions[0].text} with ${secondSkill.selectedOptions[0].text}<br>`;

  let codes;
  if (hash === "#uljm") {
    codes = calculateCodesULJM({
      skill1Id: Number(firstSkill.value),
      skill2Id: Number(secondSkill.value),
      skill1Level: Number(firstLevel.value),
      skill2Level: Number(secondLevel.value),
      slot: Number(slot.value),
      talismanId: Number(talisman.value),
      box: Number(box.value),
    });
  } else {
    codes = calculateCodes({
      skill1Id: Number(firstSkill.value),
      skill2Id: Number(secondSkill.value),
      skill1Level: Number(firstLevel.value),
      skill2Level: Number(secondLevel.value),
      slot: Number(slot.value),
      talismanId: Number(talisman.value),
      box: Number(box.value),
    });
  }

  switch (codes) {
    case "no level":
      ret = "Please, input skill level";
      break;

    case "too long":
      ret = "Too Long, Too much. Don't be greedy";
      break;

    default:
      ret = names + codes;
  }

  output.innerHTML = ret;
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  document
    .querySelectorAll("input, select")
    .forEach((el) => el.addEventListener("input", calculateValues));
});
