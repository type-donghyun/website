document.addEventListener("DOMContentLoaded", function () {

    // 타이틀 변화
    const changingTextElement = document.getElementById("title");
    const textArray = ["롤낳대", "찬CK"];
    let currentIndex = 1;

    function changeText() {
        changingTextElement.textContent = textArray[currentIndex];
        currentIndex = (currentIndex + 1) % textArray.length;
    }

    setInterval(changeText, 5000);

    // 신청 인원 현황
    function updateApplicantsCount() {
        fetch("롤낳대/php/get_applicantscount.php")
            .then(response => response.text())
            .then(count => {
                // 받아온 데이터를 화면에 업데이트
                const countElement = document.getElementById("applicantsCount");
                if (countElement) {
                    countElement.textContent = count;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // 에러 처리
            });
    }

    setInterval(updateApplicantsCount, 1000);

    // 시계
    const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    function updateTime() {
        var now = new Date();

        document.getElementById("time").innerText =
            zeroPadding(now.getHours(), 2) + ":" +
            zeroPadding(now.getMinutes(), 2) + ":" +
            zeroPadding(now.getSeconds(), 2);

        document.getElementById("date").innerText =
            now.getFullYear() + "-" +
            zeroPadding(now.getMonth() + 1, 2) + "-" +
            zeroPadding(now.getDate(), 2) + " " +
            WEEK[now.getDay()];
    }

    setInterval(updateTime, 1000);
    updateTime();

    function zeroPadding(number, width) {
        return String(number).padStart(width, '0');
    }

    // Roit ID # 보정
    const riotIdInput = document.getElementById("riotid");
    riotIdInput.addEventListener("input", handleRiotIdInput);
    function handleRiotIdInput(event) {
        const inputValue = event.target.value;

        if (inputValue.includes("#") && !/\s#/.test(inputValue)) {
            riotIdInput.value = inputValue.replace("#", " #");
        }
    }

    // 상위 랭크 검증 alert
    const selectCurrRankElement = document.getElementById('currrank');
    let previousCurrRankValue = 'UnRank';
    selectCurrRankElement.addEventListener('change', () => {
        const selectedCurrRankOptionText = selectCurrRankElement.options[selectCurrRankElement.selectedIndex].text;
        if (selectedCurrRankOptionText === '마스터' || selectedCurrRankOptionText === '그랜드마스터' || selectedCurrRankOptionText === '챌린저') {
            const isTierConfirmed = window.confirm(selectedCurrRankOptionText + " 랭크를 선택하셨습니다. 정말로 진행하시겠습니까?");
            if (!isTierConfirmed) {
                selectCurrRankElement.value = previousCurrRankValue;
                return false;
            }
        }
        previousCurrRankValue = selectCurrRankElement.value;
    });

    // 상위 랭크 검증 alert
    const selectTopRankElement = document.getElementById('toprank');
    let previousTopRankValue = 'UnRank';
    selectTopRankElement.addEventListener('change', () => {
        const selectedTopRankOptionText = selectTopRankElement.options[selectTopRankElement.selectedIndex].text;
        if (selectedTopRankOptionText === '마스터' || selectedTopRankOptionText === '그랜드마스터' || selectedTopRankOptionText === '챌린저') {
            const isTierConfirmed = window.confirm(selectedTopRankOptionText + " 랭크를 선택하셨습니다. 정말로 진행하시겠습니까?");
            if (!isTierConfirmed) {
                selectTopRankElement.value = previousTopRankValue;
                return false;
            }
        }
        previousTopTierValue = selectTopRankElement.value;
    });

    // 현재 달성 랭크 <= 최고 달성 랭크 alert
    const currrankSelect = document.getElementById('currrank');
    const toprankSelect = document.getElementById('toprank');

    const toprankSeasonSelect = document.getElementById('toprankseason');
    toprankSeasonSelect.value = '';

    currrankSelect.addEventListener('change', function () {
        const currrankIndex = currrankSelect.selectedIndex;
        const toprankIndex = toprankSelect.selectedIndex;

        if (currrankIndex > toprankIndex) {
            toprankSelect.selectedIndex = currrankIndex;
        }

        if (toprankSelect.value === 'UnRank') {
            toprankSeasonSelect.disabled = true;
            toprankSeasonSelect.value = '';
        } else {
            toprankSeasonSelect.disabled = false;
        }
    });

    toprankSelect.addEventListener('change', function () {
        const currrankIndex = currrankSelect.selectedIndex;
        const toprankIndex = toprankSelect.selectedIndex;

        if (currrankIndex > toprankIndex) {
            alert('최고 달성 랭크는 현재 달성 랭크보다 낮을 수 없습니다.');
            toprankSelect.selectedIndex = currrankIndex;
        }

        if (toprankSelect.value === 'UnRank') {
            toprankSeasonSelect.disabled = true;
            toprankSeasonSelect.value = '';
        } else {
            toprankSeasonSelect.disabled = false;
        }
    });

    // 주 포지션 선택 로직
    const mainlineRadioButtons = document.querySelectorAll('input[name="mainline"]');
    const sublineRadioButtons = document.querySelectorAll('input[name="subline"]');
    const mainline1SelectElement = document.getElementById('mainline1');
    const mainline2SelectElement = document.getElementById('mainline2');
    const mainline3SelectElement = document.getElementById('mainline3');
    mainline1SelectElement.value = '';
    mainline2SelectElement.value = '';
    mainline3SelectElement.value = '';

    mainlineRadioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            const selectedValue = this.value;

            if (selectedValue === 'enable') {
                mainline1SelectElement.disabled = true;

                sublineRadioButtons.forEach(function (radioButton) {
                    radioButton.disabled = true;
                });
            } else {
                mainline1SelectElement.disabled = false;
                mainline1SelectElement.value = '';

                sublineRadioButtons.forEach(function (radioButton) {
                    radioButton.disabled = false;
                });
            }
            mainline2SelectElement.disabled = true;
            mainline3SelectElement.disabled = true;
            mainline2SelectElement.value = '';
            mainline3SelectElement.value = '';
            sublineRadioButtons.forEach(function (radioButton) {
                radioButton.checked = false;
            });

            subline1SelectElement.disabled = true;
            subline2SelectElement.disabled = true;
            subline3SelectElement.disabled = true;
            subline1SelectElement.value = '';
            subline2SelectElement.value = '';
            subline3SelectElement.value = '';
        });
    });

    mainline1SelectElement.addEventListener('change', function () {
        const selectedValue = this.value;

        if (selectedValue === 'enable') {
            mainline2SelectElement.disabled = true;
        } else {
            mainline2SelectElement.disabled = false;
            mainline2SelectElement.value = '';
        }
        mainline3SelectElement.disabled = true;
        mainline3SelectElement.value = '';
    });


    mainline2SelectElement.addEventListener('change', function () {
        if (mainline1SelectElement.value === mainline2SelectElement.value) {
            alert('챔피언이 겹칠 수 없습니다.');
            mainline2SelectElement.value = '';
            return false;
        }

        const selectedValue = this.value;

        if (selectedValue === 'enable') {
            mainline3SelectElement.disabled = true;
        } else {
            mainline3SelectElement.disabled = false;
            mainline3SelectElement.value = '';
        }
    });

    mainline3SelectElement.addEventListener('change', function () {
        if (mainline1SelectElement.value === mainline3SelectElement.value || mainline2SelectElement.value === mainline3SelectElement.value) {
            alert('챔피언이 겹칠 수 없습니다.');
            mainline3SelectElement.value = '';
            return false;
        }
    })

    // 부 포지션 선택 로직
    const subline1SelectElement = document.getElementById('subline1');
    const subline2SelectElement = document.getElementById('subline2');
    const subline3SelectElement = document.getElementById('subline3');
    subline1SelectElement.value = '';
    subline2SelectElement.value = '';
    subline3SelectElement.value = '';

    sublineRadioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            const selectedSubline = document.querySelector('input[name="subline"]:checked').value;
            const selectedMainline = document.querySelector('input[name="mainline"]:checked').value;

            if (selectedSubline === selectedMainline) {
                alert('주 포지션과 부 포지션은 같을 수 없습니다.');
                this.checked = false;
                return false;
            }

            const selectedValue = this.value;

            if (selectedValue === 'enable') {
                subline1SelectElement.disabled = true;
            } else {
                subline1SelectElement.disabled = false;
                subline1SelectElement.value = '';
            }
            subline2SelectElement.disabled = true;
            subline2SelectElement.value = '';
            subline3SelectElement.disabled = true;
            subline3SelectElement.value = '';
        });
    });

    subline1SelectElement.addEventListener('change', function () {
        const selectedValue = this.value;

        if (selectedValue === 'enable') {
            subline2SelectElement.disabled = true;
        } else {
            subline2SelectElement.disabled = false;
            subline2SelectElement.value = '';
        }
        subline3SelectElement.disabled = true;
        subline3SelectElement.value = '';
    });


    subline2SelectElement.addEventListener('change', function () {
        if (subline1SelectElement.value === subline2SelectElement.value) {
            alert('챔피언이 겹칠 수 없습니다.');
            subline2SelectElement.value = '';
            return false;
        }

        const selectedValue = this.value;

        if (selectedValue === 'enable') {
            subline3SelectElement.disabled = true;
        } else {
            subline3SelectElement.disabled = false;
            subline3SelectElement.value = '';
        }
    });

    subline3SelectElement.addEventListener('change', function () {
        if (subline1SelectElement.value === subline3SelectElement.value || subline2SelectElement.value === subline3SelectElement.value) {
            alert('챔피언이 겹칠 수 없습니다.');
            subline3SelectElement.value = '';
            return false;
        }
    })

    // 추가적인 유효성 검사 함수 정의
    function validateForm(formData) {
        const name = formData.get("name");
        const riotId = formData.get("riotid");

        const currentDate = new Date();
        const allowedDate = new Date("2023-12-05T22:22:22");
        const endDate = new Date("2023-12-14T00:00:00")
        if (currentDate < allowedDate || currentDate > endDate) {
            alert("참가 신청 기간이 아닙니다.");
            return false;
        }

        if (!name || !riotId) {
            alert("이름과 Riot ID를 입력해야합니다.");
            return false;
        }

        if (name.length > 4) {
            alert("이름은 4글자 이하여야 합니다.");
            return false;
        }

        if (!/^[가-힣]+$/.test(name)) {
            alert("이름에는 한글만 입력할 수 있습니다.");
            return false;
        }

        if (!/#/.test(riotId)) {
            alert("Roit ID 태그가 반드시 포함되어야 합니다.");
            return false;
        }

        const afterHash = riotId.split("#")[1];
        if (!/^.{3,5}$/.test(afterHash)) {
            alert("Riot ID의 태그는 3글자 이상 5글자 이하의 문자열이어야 합니다.");
            return false;
        }

        const mainlineRadios = document.querySelectorAll('input[name="mainline"]:checked');
        if (mainlineRadios.length === 0) {
            alert("주 포지션을 선택해야 합니다.");
            return false;
        }

        const champion1Select = document.getElementById('mainline1');
        if (champion1Select.value === "") {
            alert("주 포지션 챔피언을 하나 이상 선택해야 합니다.");
            return false;
        }

        const sublineRadios = document.querySelectorAll('input[name="subline"]:checked');
        const subChampionSelect = document.getElementById('subline1');
        if (sublineRadios.length > 0 && subChampionSelect.value === "") {
            alert("부 포지션을 선택했다면 부 포지션 챔피언을 하나 이상 선택해야 합니다.");
            return false;
        }

        const aspirationTextarea = document.getElementById('aspiration');
        const aspirationValue = aspirationTextarea.value.trim();
        if (aspirationValue === "") {
            alert("참가 포부를 작성해야합니다.");
            return false;
        }

        return true;
    }

    // 신청 폼 초기화
    function resetForm() {
        const form = document.querySelector("form");
        form.reset();
        checkedCount = 0;
        toprankSeasonSelect.disabled = true;
        toprankSeasonSelect.value = '';

        mainline1SelectElement.disabled = true;
        mainline2SelectElement.disabled = true;
        mainline3SelectElement.disabled = true;

        mainline1SelectElement.value = '';
        mainline2SelectElement.value = '';
        mainline3SelectElement.value = '';

        sublineRadioButtons.forEach(function (radioButton) {
            radioButton.disabled = true;
        });

        subline1SelectElement.disabled = true;
        subline2SelectElement.disabled = true;
        subline3SelectElement.disabled = true;

        subline1SelectElement.value = '';
        subline2SelectElement.value = '';
        subline3SelectElement.value = '';
    }


    // 중복 체크
    function checkDuplicate(formData) {
        return fetch("롤낳대/php/check_duplicate.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => data.duplicate)
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }


    // 폼 제출
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", submitForm);

    function submitForm(event) {
        event.preventDefault();

        const formData = new FormData(document.querySelector("form"));

        if (validateForm(formData)) {
            // 중복 체크
            checkDuplicate(formData)
                .then((isDuplicate) => {
                    if (!isDuplicate) {
                        // 중복 쿼리가 없을 때

                        fetch("롤낳대/php/submit.php", {
                            method: "POST",
                            body: formData
                        })
                            .then(response => response.text())
                            .then(data => {
                                console.log(data);
                                if (data.includes("Success")) {
                                    resetForm();
                                    alert("참가 신청이 성공적으로 완료되었습니다.");
                                } else {
                                    alert("참가 신청에 실패했습니다. 다시 시도해주세요.");
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert("서버와의 통신 중 문제가 발생했습니다. 다시 시도해주세요.");
                            });
                    } else {
                        const DuplicateConfirmed = window.confirm("이미 등록된 정보가 있습니다. 정보를 갱신하시겠습니까?");
                        if (DuplicateConfirmed) {
                            // 갱신을 시도할 때
                            fetch("롤낳대/php/data_update.php", {
                                method: "POST",
                                body: formData
                            })
                                .then(response => response.text())
                                .then(data => {
                                    console.log(data);
                                    if (data.includes("Success")) {
                                        resetForm();
                                        alert("정보 갱신이 성공적으로 완료되었습니다.");
                                    } else {
                                        alert("정보 갱신에 실패했습니다. 다시 시도해주세요.");
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    alert("서버와의 통신 중 문제가 발생했습니다. 다시 시도해주세요.");
                                });
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // 중복 체크 실패 시에 대한 처리
                });
        }
    }
});
