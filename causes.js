document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Quiz functionality
const quizData = [
    {
        question: "Which issue concerns you the most?",
        options: ["Poverty", "Education", "Environment", "Healthcare"],
        causes: ["Poverty Alleviation", "Education and Literacy", "Environmental Conservation", "Healthcare and Disease Prevention"]
    },
    {
        question: "What age group do you feel most passionate about helping?",
        options: ["Children", "Teenagers", "Adults", "Elderly"],
        causes: ["Children's Rights and Welfare", "Education and Literacy", "Human Rights and Social Justice", "Healthcare and Disease Prevention"]
    },
    {
        question: "Which area of impact interests you the most?",
        options: ["Local Community", "National", "Global", "Specific Region"],
        causes: ["Poverty Alleviation", "Human Rights and Social Justice", "Refugee and Immigrant Support", "Disaster Relief and Humanitarian Aid"]
    }
];

let currentQuestionIndex = 0;
let userResponses = [];

function startQuiz() {
    currentQuestionIndex = 0;
    userResponses = [];
    showQuestion();
}

function showQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const currentQuestion = quizData[currentQuestionIndex];
    
    let html = `<h3>${currentQuestion.question}</h3>`;
    html += '<ul>';
    currentQuestion.options.forEach((option, index) => {
        html += `<li><button onclick="selectOption(${index})">${option}</button></li>`;
    });
    html += '</ul>';
    
    quizContainer.innerHTML = html;
}

function selectOption(optionIndex) {
    userResponses.push(optionIndex);
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    const recommendedCauses = getRecommendedCauses();
    
    let html = '<h3>Based on your responses, we recommend these causes:</h3>';
    html += '<ul>';
    recommendedCauses.forEach(cause => {
        html += `<li>${cause}</li>`;
    });
    html += '</ul>';
    html += '<button onclick="startQuiz()">Retake Quiz</button>';
    
    quizContainer.innerHTML = html;
}

function getRecommendedCauses() {
    const causeCounts = {};
    quizData.forEach((question, index) => {
        const selectedCause = question.causes[userResponses[index]];
        causeCounts[selectedCause] = (causeCounts[selectedCause] || 0) + 1;
    });
    
    return Object.keys(causeCounts).sort((a, b) => causeCounts[b] - causeCounts[a]).slice(0, 3);
}



    // Donation Progress Bar
    const targetDonation = 10000; // Target amount
    let currentDonation = 7000; // Current amount

    function updateProgressBar() {
        const progress = document.getElementById('progress');
        const progressText = document.getElementById('progress-text');
        const percentage = (currentDonation / targetDonation) * 100;
        progress.style.width = `${percentage}%`;
        progressText.textContent = `Raised $${currentDonation} of $${targetDonation} (${percentage.toFixed(2)}%)`;
    }

    updateProgressBar();

    // Testimonials Carousel
    const carousel = document.getElementById('testimonial-carousel');
    const testimonials = carousel.children;
    let currentIndex = 0;

    function showTestimonial(index) {
        for (let i = 0; i < testimonials.length; i++) {
            testimonials[i].style.transform = `translateX(-${index * 100}%)`;
        }
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    setInterval(nextTestimonial, 3000); // Change testimonial every 3 seconds

    // Initialize Slick Carousel for Causes
    $('.causes-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    startQuiz();
});