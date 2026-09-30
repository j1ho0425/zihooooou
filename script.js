// 기본 더미 레시피 데이터
var defaultRecipes = [
    {
        id: 1,
        name: '초코칩 쿠키',
        image: 'images/초코칩 쿠키.png',
        recipe: '녹인버터 115g, 황설탕 50g, 흑설탕 145g 넣고 너무 많이 섞지 말기, 계란 1개, 박력분 214g, 베이킹 파우더 2g, 초코칩 100g, 반죽 1시간 동안 휴지 시키고 200도 예열 후 180도에서 12분 굽기'
    },
    {
        id: 2,
        name: '치즈케이크',
        image: 'images/download.jpg',
        recipe: '크림치즈 300g, 설탕 100g, 계란 2개, 바닐라 추출물 1tsp를 섞어 160도에서 45분간 구워주세요.'
    },
    {
        id: 3,
        name: '바나나 브레드',
        image: 'https://via.placeholder.com/300x200/ffc107/ffffff?text=바나나+브레드',
        recipe: '익은 바나나 2개, 밀가루 200g, 설탕 100g, 계란 1개, 버터 50g을 섞어 180도에서 40분간 구워주세요.'
    },
    {
        id: 4,
        name: '블루베리 머핀',
        image: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=블루베리+머핀',
        recipe: '밀가루 200g, 설탕 80g, 계란 1개, 우유 100ml, 블루베리 100g을 넣고 180도에서 20분간 구워주세요.'
    },
    {
        id: 5,
        name: '애플파이',
        image: 'https://via.placeholder.com/300x200/4caf50/ffffff?text=애플파이',
        recipe: '사과 3개, 설탕 80g, 시나몬 1tsp, 파이 도우를 준비해 190도에서 30분간 구워주세요.'
    },
    {
        id: 6,
        name: '레드벨벳 케이크',
        image: 'https://via.placeholder.com/300x200/e91e63/ffffff?text=레드벨벳+케이크',
        recipe: '밀가루 250g, 설탕 200g, 코코아파우더 1tsp, 식용색소 1tsp, 계란 2개를 섞어 180도에서 25분간 구워주세요.'
    }
];

// 레시피 데이터 변수
var recipes = [];

// localStorage에서 레시피 데이터 불러오기
function loadRecipes() {
    var savedRecipes = localStorage.getItem('bakingRecipes');
    if (savedRecipes) {
        recipes = JSON.parse(savedRecipes);
    } else {
        // 처음 실행이면 기본 데이터 사용
        recipes = defaultRecipes;
        saveRecipes();
    }
}

// localStorage에 레시피 데이터 저장하기
function saveRecipes() {
    localStorage.setItem('bakingRecipes', JSON.stringify(recipes));
}

// 레시피 리스트를 화면에 보여주는 함수
function displayRecipes() {
    var recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';

    for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i];

        var card = document.createElement('div');
        card.className = 'recipe-card';

        // 카드에 레시피 ID 저장
        card.dataset.recipeId = recipe.id;

        // 카드 클릭 이벤트
        card.onclick = function() {
            var recipeId = this.dataset.recipeId;
            var recipe = recipes[recipeId - 1];
            showRecipeDetail(recipe);
        };

        var image = document.createElement('img');
        image.className = 'recipe-image';
        image.src = recipe.image;
        image.alt = recipe.name;

        var info = document.createElement('div');
        info.className = 'recipe-info';

        var name = document.createElement('h3');
        name.className = 'recipe-name';
        name.textContent = recipe.name;

        var preview = document.createElement('p');
        preview.className = 'recipe-preview';
        preview.textContent = recipe.recipe;

        info.appendChild(name);
        info.appendChild(preview);
        card.appendChild(image);
        card.appendChild(info);
        recipeList.appendChild(card);
    }
}

// 레시피 상세 보기 함수
function showRecipeDetail(recipe) {
    var detailModal = document.getElementById('detailModal');
    var detailName = document.getElementById('detailName');
    var detailImage = document.getElementById('detailImage');
    var detailRecipe = document.getElementById('detailRecipe');

    detailName.textContent = recipe.name;
    detailImage.src = recipe.image;
    detailRecipe.textContent = recipe.recipe;

    // 현재 보고 있는 레시피 ID 저장
    detailModal.dataset.currentRecipeId = recipe.id;

    detailModal.style.display = 'block';
}

// 레시피 삭제 함수
function deleteRecipe(recipeId) {
    var confirmDelete = confirm('정말로 이 레시피를 삭제하시겠습니까?');
    if (confirmDelete) {
        // 레시피 찾기
        var index = -1;
        for (var i = 0; i < recipes.length; i++) {
            if (recipes[i].id == recipeId) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            // 레시피 삭제
            recipes.splice(index, 1);

            // localStorage에 저장
            saveRecipes();

            // 화면 다시 그리기
            displayRecipes();

            // 모달 닫기
            document.getElementById('detailModal').style.display = 'none';
        }
    }
}

// 레시피 수정 함수
function editRecipe(recipeId) {
    // 레시피 찾기
    var recipe = null;
    for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id == recipeId) {
            recipe = recipes[i];
            break;
        }
    }

    if (recipe) {
        // 수정 폼에 값 채우기
        document.getElementById('editRecipeId').value = recipe.id;
        document.getElementById('editRecipeName').value = recipe.name;
        document.getElementById('editRecipeImage').value = recipe.image;
        document.getElementById('editRecipeText').value = recipe.recipe;

        // 상세 보기 모달 닫기
        document.getElementById('detailModal').style.display = 'none';

        // 수정 모달 열기
        document.getElementById('editModal').style.display = 'block';
    }
}

// 페이지가 로드되면 레시피 리스트를 보여줌
window.onload = function() {
    // 레시피 데이터 불러오기
    loadRecipes();
    displayRecipes();

    // 버튼 클릭 이벤트 연결
    var addBtn = document.getElementById('addRecipeBtn');
    var closeModalBtn = document.getElementById('closeModalBtn');
    var modal = document.getElementById('addModal');
    var recipeForm = document.getElementById('recipeForm');

    // 상세 보기 모달 관련
    var detailModal = document.getElementById('detailModal');
    var closeDetailBtn = document.getElementById('closeDetailBtn');
    var editRecipeBtn = document.getElementById('editRecipeBtn');
    var deleteRecipeBtn = document.getElementById('deleteRecipeBtn');

    // 수정 모달 관련
    var editModal = document.getElementById('editModal');
    var closeEditBtn = document.getElementById('closeEditBtn');
    var editForm = document.getElementById('editForm');

    // 모달 열기
    addBtn.onclick = function() {
        modal.style.display = 'block';
    };

    // 모달 닫기
    closeModalBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // 상세 보기 모달 닫기
    closeDetailBtn.onclick = function() {
        detailModal.style.display = 'none';
    };

    // 수정 버튼 클릭
    editRecipeBtn.onclick = function() {
        var recipeId = detailModal.dataset.currentRecipeId;
        editRecipe(recipeId);
    };

    // 삭제 버튼 클릭
    deleteRecipeBtn.onclick = function() {
        var recipeId = detailModal.dataset.currentRecipeId;
        deleteRecipe(recipeId);
    };

    // 수정 모달 닫기
    closeEditBtn.onclick = function() {
        editModal.style.display = 'none';
    };

    // 모달 바깥 클릭하면 닫기
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
        if (event.target == detailModal) {
            detailModal.style.display = 'none';
        }
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    };

    // 레시피 추가 폼 제출
    recipeForm.onsubmit = function(event) {
        event.preventDefault();

        var name = document.getElementById('recipeName').value;
        var image = document.getElementById('recipeImage').value;
        var recipeText = document.getElementById('recipeText').value;

        // 사진 URL이 비어있으면 기본 이미지 사용
        if (!image) {
            image = 'https://via.placeholder.com/300x200/e91e63/ffffff?text=' + encodeURIComponent(name);
        }

        // 새 레시피 객체 생성
        var newRecipe = {
            id: recipes.length + 1,
            name: name,
            image: image,
            recipe: recipeText
        };

        // 레시피 리스트에 추가
        recipes.push(newRecipe);

        // localStorage에 저장
        saveRecipes();

        // 화면 다시 그리기
        displayRecipes();

        // 모달 닫기
        modal.style.display = 'none';

        // 폼 초기화
        recipeForm.reset();
    };

    // 레시피 수정 폼 제출
    editForm.onsubmit = function(event) {
        event.preventDefault();

        var recipeId = document.getElementById('editRecipeId').value;
        var name = document.getElementById('editRecipeName').value;
        var image = document.getElementById('editRecipeImage').value;
        var recipeText = document.getElementById('editRecipeText').value;

        // 사진 URL이 비어있으면 기본 이미지 사용
        if (!image) {
            image = 'https://via.placeholder.com/300x200/e91e63/ffffff?text=' + encodeURIComponent(name);
        }

        // 레시피 찾기
        for (var i = 0; i < recipes.length; i++) {
            if (recipes[i].id == recipeId) {
                recipes[i].name = name;
                recipes[i].image = image;
                recipes[i].recipe = recipeText;
                break;
            }
        }

        // localStorage에 저장
        saveRecipes();

        // 화면 다시 그리기
        displayRecipes();

        // 모달 닫기
        editModal.style.display = 'none';

        // 폼 초기화
        editForm.reset();
    };
};
