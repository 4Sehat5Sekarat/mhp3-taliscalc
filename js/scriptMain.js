const calculateBtn = document.getElementById("calculate");
const copyBtn = document.getElementById("copy-button");
const output = document.getElementById("output");
const themeButton = document.getElementById("theme-button");

calculateBtn.addEventListener("click", calculateValues);
copyBtn.addEventListener("click", copyResult);
themeButton.addEventListener("click", changeTheme);

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

function copyResult() {
  const text = output.innerText;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("[!] Copy oke");
      showToast("copy oke!");
    })
    .catch((err) => {
      console.log(err);
    });
}

function changeTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}

function calculateValues() {
  // Get skill id from input
  const firstSkillId = parseInt(
    document.getElementById("firstSkillId").value,
    10,
  );
  const secondSkillId = parseInt(
    document.getElementById("secondSkillId").value,
    10,
  );

  // Get skill level from input
  let firstSkillLevel = parseInt(
    document.getElementById("firstSkillLevel").value,
    10,
  );
  let secondSkillLevel = parseInt(
    document.getElementById("secondSkillLevel").value,
    10,
  );
  const talismanRarity = parseInt(
    document.getElementById("talismanRarity").value,
    10,
  );
  const numberOfSlots = parseInt(
    document.getElementById("numberOfSlot").value,
    10,
  );
  const boxSlots = parseInt(document.getElementById("boxSlot").value, 10);

  // check if input level are filled
  if (isNaN(firstSkillLevel) || firstSkillLevel === "") {
    firstSkillLevel = 0;
  }
  if (isNaN(secondSkillLevel) || secondSkillLevel === "") {
    secondSkillLevel = 0;
  }

  // calculate reference from forum
  const x = firstSkillId + secondSkillId * 128 + 16384 * numberOfSlots;
  const y =
    (firstSkillLevel + 30) * 16 +
    1024 * (secondSkillLevel + 30) +
    talismanRarity -
    1;
  const z = 65032 + 12 * boxSlots;
  const a = 65036 + 12 * boxSlots;

  const xHex = x.toString(16).toUpperCase().padStart(4, "0");
  const yHex = y.toString(16).toUpperCase().padStart(4, "0");
  const zHex = z.toString(16).toUpperCase().padStart(4, "0");
  const aHex = a.toString(16).toUpperCase().padStart(4, "0");

  const talisName = document.getElementById(
    "talismanRarity" + talismanRarity,
  ).textContent;

  if (firstSkillLevel || secondSkillLevel) {
    if (yHex.length > 4) {
      output.textContent = `Too many skill levels`;
    } else {
      output.innerHTML = `_C0 Custom ${talisName} [${numberOfSlots} Slot]<br />_L 0x2174${zHex} 0x${yHex}6501<br />_L 0x2174${aHex} 0x0000${xHex}`;
    }
  } else {
    output.textContent = `Input skill levels, please`;
  }
}
