//function to toggle mon year plan//
function switchPricing() {
  const checbox = document.getElementById("pricing-toggle-checkbox");
  const monthlypricing = document.querySelectorAll( ".monthly-price");
  const yearlypricing = document.querySelectorAll( ".yearly-price");
  const yearlydiscount = document.querySelector(".save-percentage");

  if(checbox.checked){
      monthlypricing.forEach((price) => price.classList.add("hidden"));
      yearlypricing.forEach((price) => price.classList.remove("hidden"));
      yearlydiscount.style.display = "inline";
  } else {
      monthlypricing.forEach((price) => price.classList.remove("hidden"));
      yearlypricing.forEach((price) => price.classList.add("hidden"));
      yearlydiscount.style.display = "none";
  }
}