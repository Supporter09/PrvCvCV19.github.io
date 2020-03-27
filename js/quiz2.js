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
        question: "Câu 1: Đeo nhiều khẩu trang cùng lúc có an toàn hơn?",
        answers: {
          a: "Không",
          b: "Có",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 2: Đeo khẩu trang y tế có bảo vệ tôi khỏi virus?",
        answers: {
          a: "Chỉ khẩu trang y tế là đủ",
          b: "Phải kết hợp với vệ sinh cá nhân, vệ sinh dụng cụ, vật dụng và rửa tay với xà phòng",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 3: Khẩu trang dùng xong có được bỏ ở thùng rác trong nhà hay phải vứt đi xa?",
        answers: {
          a: "Cần phải vứt đi xa",
          b: "Miễn thùng rác an toàn, có nắp đậy",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 4: Sau khi sử dụng, để đảm bảo an toàn, không được xử lý khẩu trang theo cách nào?",
        answers: {
          a: "Chỉ cầm vào dây quai đeo qua tai để tháo",
          b: "Có thể dùng tay cầm trực tiếp vào bề mặt khẩu trang để tháo ra",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 5: Loại khẩu trang nào giúp phòng virus Corona tốt hơn?",
        answers: {
          a: "Nhất thiết tất cả mọi người phải đeo khẩu trang N95",
          b: "Có thể dùng khẩu trang y tế thông thường hoặc khẩu trang vải được giặt sạch hàng ngày",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 6: Đeo khẩu trang có giúp tôi ngăn nhiễm khi chẳng may tiếp xúc với người nhiễm virus corona không?",
        answers: {
          a: "Tùy thuộc loại khẩu trang",
          b: "Mọi loại khẩu trang",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 7: Sức khỏe ổn định và chưa từng tiếp xúc với đối tượng có nguy cơ nhiễm bệnh thì có cần đeo khẩu trang không?",
        answers: {
          a: "Không nhất thiết",
          b: "Vẫn bắt buộc phải đeo khẩu trang",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 8: Trẻ con thường không chịu đeo khẩu trang, vậy tôi cần làm gì để tránh cho con bị lây nhiễm virus Corona?",
        answers: {
          a: "Không cho trẻ tiếp xúc nơi đông người",
          b: "Trẻ em khó có thể bị mắc bệnh nên k cần thiết phải đeo khẩu trang",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 9: Nếu phải đi học, có cần cho trẻ đeo khẩu trang 24/24 trong lớp không?",
        answers: {
          a: "Không cần thiết nhưng phải tuân thủ các biện pháp phòng ngừa như hắt hơi che miệng bằng khuỷu tay,...",
          b: "Có, nhất thiết phải đeo để phòng dịch",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 10: Đối tượng nào không cần đeo khẩu trang?",
        answers: {
          a: "Người bình thường ngồi trong văn phòng làm việc",
          b: "Người bình thường ở nơi có nguy cơ lây lan cao như khi đi phương tiện công cộng, đến bệnh viện",
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
  