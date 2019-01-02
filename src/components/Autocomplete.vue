<template>
    <div class="autocomplete">
        <input class='form-control' type="text" placeholder="Start typing to get suggestions..." @focus="onFocus" @input="onChange" v-model="search" @keydown.down="onArrowDown" @keydown.up="onArrowUp" @keydown.enter="onEnter" @keydown.tab="onEnter" :required="isRequired" />
        <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
            <li class="loading" v-if="isLoading">
                Loading results...
            </li>
            <li v-else v-for="(result, i) in results" :key="i" @click="setResult(result)" class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
                {{ displayProp ? result[displayProp] : result }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'autocomplete',
        props: {
            items: {
                type: Array,
                required: false,
                default: () => [],
            },
            maxResults: {
                type: Number,
                required: false,
                default: 15
            },
            displayProp: {
                type: String,
                require: false,
                default: null
            },
            valueProp: {
                type: String,
                require: false,
                default: null
            },
            isAsync: {
                type: Boolean,
                required: false,
                default: false,
            },
            initialDisplay: {
                type: String,
                required: false,
                default: ""
            },
            initialSelected: {
                type: String,
                required: false,
                default: null
            },
            isRequired: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                isOpen: false,
                results: [],
                search: this.initialDisplay,
                isLoading: false,
                arrowCounter: 0,
                selected: this.initialSelected
            };
        },
        methods: {
            onChange() {
                // Let's warn the parent that a change was made
                this.$emit('input', this.search);
                // Is the data given by an outside ajax request?
                if (this.isAsync) {
                    this.isLoading = true;
                } else {
                    // Let's  our flat array
                    this.filterResults();
                    this.isOpen = true;
                }
            },
            filterResults() {
                // first uncapitalize all the things
                this.results = this.items.filter((item) => {
                    let searchable = this.displayProp ? item[this.displayProp] : item;
                    if (searchable == null) {
                        searchable = "";
                    }
                    if (!this.search) {
                        this.search = "";
                    }
                    return searchable.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                }).slice(0, this.maxResults);
            },
            setResult(result) {
                this.search = result && this.displayProp ? result[this.displayProp] : result;
                this.isOpen = false;
                this.selected = result && this.valueProp ? result[this.valueProp] : result;
                this.$emit('selection', this.selected);
            },
            onArrowDown(evt) {
                if (this.arrowCounter < this.results.length) {
                    this.arrowCounter = this.arrowCounter + 1;
                }
            },
            onArrowUp() {
                if (this.arrowCounter > 0) {
                    this.arrowCounter = this.arrowCounter - 1;
                }
            },
            onEnter() {
                let result = this.results[this.arrowCounter];
                this.setResult(result);

                this.arrowCounter = -1;
            },
            handleClickOutside(evt) {
                if (!this.$el.contains(evt.target)) {
                    this.isOpen = false;
                    this.arrowCounter = -1;
                }
            },
            onFocus() {
                this.isOpen = true;
                this.filterResults();
            }
        },
        watch: {
            items: function (val, oldValue) {
                // actually compare them
                if (val.length !== oldValue.length) {
                    this.results = val;
                    this.isLoading = false;
                }
            },
        },
        mounted() {
            document.addEventListener('click', this.handleClickOutside)
        },
        destroyed() {
            document.removeEventListener('click', this.handleClickOutside)
        }
    };
</script>

<style lang="scss">
    .autocomplete {
        position: relative;
        margin: auto;
    }
    .autocomplete-results {
        padding: 0;
        margin: 0;
        border: 1px solid #eeeeee;
        overflow: auto;
        position: absolute;
        z-index: 1;
        background: #FFF;
        width: 100%;
    }
    .autocomplete-result {
        list-style: none;
        text-align: left;
        padding: 4px 2px;
        cursor: pointer;
    }
    .autocomplete-result.is-active,
    .autocomplete-result:hover {
        background-color: #4AAE9B;
        color: white;
    }
</style>
