(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Câu 1: Rửa tay trong bao lâu là đủ?",
        answers: {
          a: "Tối thiểu 20 giây",
          b: "Tối đa 20 giây",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 2: Rửa tay như thế nào để đảm bảo an toàn cho chính mình trong mùa dịch?",
        answers: {
          a: "Rửa tay trong trung bình 10 giây",
          b: "Rửa tay thường xuyên với xà phòng và nước từ vòi",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 3: Vị trí nào dễ bị bỏ qua khi rửa tay?",
        answers: {
          a: "Giữa móng và ngón tay",
          b: "Kẽ ngón tay",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 4: Nên ưu tiên rửa tay bằng xà phòng với nước hay sử dụng nước rửa tay khô?",
        answers: {
          a: "Rửa tay dưới vòi nước với xà phòng là cách đơn giản và hiệu quả nhất",
          b: "Nước rửa tay khô/cồn khô tốt hơn",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 5: Sau mỗi lần cầm nắm vật dụng thường được động chạm, có cần phải rửa tay ngay không?",
        answers: {
          a: "Có",
          b: "Không",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 6: Khi rửa tay có nhất thiết phải dùng các sản phẩm tiệt trùng không hay có thể rửa bằng xà phòng thường?",
        answers: {
          a: "Không nhất thiết dùng sản phẩm tiệt trùng",
          b: "Có nhất thiết dùng sản phẩm tiệt trùng",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 7: Khi ho đã che miệng nhưng không có điều kiện rửa tay ngay thì nên làm như thế nào khi tiếp xúc với người khác?",
        answers: {
          a: "Lau tay bằng giấy ăn",
          b: "Nhất thiết không tiếp xúc, chạm tay vào ai cho đến khi có điều kiện rửa tay",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 8: Nên rửa tay bằng nước rửa tay sát khuẩn, nhưng trong đó lại có cồn, có an toàn với trẻ em không?",
        answers: {
          a: "Trẻ em sử dụng được nước rửa tay có cồn nhưng chỉ là loại 70%",
          b: "Được, nước sát khuẩn có cồn không những an toàn cho trẻ nhỏ mà còn giúp diệt sạch vi khuẩn",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 9: Rửa tay như nào sẽ đảm bảo đã rửa tay sạch?",
        answers: {
          a: "Miễn rửa tay với nước và xà phòng là được, bất kể trong bao lâu",
          b: "Theo quy trình rửa tay thường quy 6 bước khuyến cáo bởi Bộ Y Tế để không bỏ sót bất cứ vị trí nào trên tay",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 10: Ca khúc nào sau đây là ca khúc để tuyên truyền về covid19?",
        answers: {
          a: "Ghen Cô Vy",
          b: "Ghen Cô Rô Na",
        },
        correctAnswer: "a"
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  