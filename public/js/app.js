$(document).ready(function () {
	$(".slider").slick({
		arrows: false,
		dots: true,
		appendDots: ".slider-dots",
		dotsClass: "dots",
	});

	let hamberger = document.querySelector(".hamberger");
	let uls = document.querySelector("ul");

	let times = document.querySelector(".times");
	let mobileNav = document.querySelector(".mobile-nav");

	hamberger.addEventListener("click", function () {
		mobileNav.classList.add("open");
	});

	times.addEventListener("click", function () {
		mobileNav.classList.remove("open");
	});
	uls.addEventListener("click", function () {
		mobileNav.classList.remove("open");
	});
});
