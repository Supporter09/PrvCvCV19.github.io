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
        question: "Câu 1: Trong nhà, cần thực hiện các biện pháp gì để phòng bệnh?",
        answers: {
          a: "Tăng cường sử dụng điều hòa để tăng nhiệt độ trong phòng",
          b: "Thường xuyên lau nền nhà, tay nắm cửa và bề mặt các đồ vật trong nhà bằng các chất tẩy rửa thông thường, như xà phòng và các dung dịch khử khuẩn thông thường khác",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 2: Khi đi chợ bán thực phẩm tươi sống, làm thế nào để tránh bị lây nhiễm virus corona?",
        answers: {
          a: "Chỉ cần tránh miệng, có thẻ chạm tay thoải mái vào mắt, mũi",
          b: "Đeo khẩu trang; Dùng bao tay khi chạm tay vào động vật hoặc sản phẩm từ động vật; Sau đó rửa tay với xà phòng đúng cách; Tránh tiếp xúc với động vật hoang dã",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 3: Nên ăn những loại thức ăn nào để đảm bảo sức đề kháng?",
        answers: {
          a: "Ăn thức ăn sạch, đảm bảo vệ sinh thực phẩm tối đa",
          b: "Những thức ăn lạ hoặc thức ăn không rõ nguồn gốc",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 4: Có khả năng bị lây nhiễm khi phải tiếp xúc với các gian hàng giết mổ động vật?",
        answers: {
          a: "Có nguy cơ",
          b: "Chỉ cần không tiếp xúc tay với mặt, mũi, miệng trong quá trình đi chợ sẽ không có nguy cơ",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 5: Nên ăn những loại rau quả nào để tăng cường sức đề kháng?",
        answers: {
          a: "Chỉ cần uống vitamin C dạng viên là đủ",
          b: "Kiwi, cam, đu đủ súp lơ xanh, cải xanh,...",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 6: Uống nước cam hay nhiều vitamin C có giúp tránh được Corona không?",
        answers: {
          a: "Có",
          b: "Không",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 7: Các quán ăn vặt vỉa hè có nguy cơ lây nhiễm virus Covid-19 không khi được cho là virus có thể lây qua đường tiêu hóa?",
        answers: {
          a: "Có nguy cơ",
          b: "Không",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 8: Có nên tiếp tục mở máy lạnh (điều hòa không khí) trong nhà vào thời điểm đang có dịch?",
        answers: {
          a: "Mở điều hòa bình thường",
          b: "Hạn chế mở điều hòa",
        },
        correctAnswer: "b"
      },
      {
        question: "Câu 9: Nếu gia đình hoặc người thân có các dấu hiệu ho, sốt, khó thở... cần làm gì?",
        answers: {
          a: "Ngay lập tức đeo khẩu trang, tự cách ly và đến khám bác sĩ tại phòng khám truyền nhiễm nếu có triệu chứng nghi ngờ",
          b: "Tiếp tục đi lại, du lịch như bình thường",
        },
        correctAnswer: "a"
      },
      {
        question: "Câu 10: Nếu bản thân có triệu chứng ho, nhưng sau 5 ngày không thấy sốt, có nghĩa là không bị nhiễm virus đúng không?",
        answers: {
          a: "Vẫn nên đi khám, xét nghiệm để kiểm tra",
          b: "Chắc chắn là an toàn",
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
  