<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillvuejsApp.normalising.home.createOrEditLabel">Create or edit a Normalising</h2>
                <div>
                    <div class="form-group" v-if="normalising.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="normalising.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="normalising-normalisingDate">Normalising Date</label>
                        <div class="input-group">
                            <input id="normalising-normalisingDate" type="date" class="form-control" name="normalisingDate"  :class="{'valid': !$v.normalising.normalisingDate.$invalid, 'invalid': $v.normalising.normalisingDate.$invalid }"
                            v-model="$v.normalising.normalisingDate.$model"  required />
                        </div>
                        <div v-if="$v.normalising.normalisingDate.$anyDirty && $v.normalising.normalisingDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.normalising.normalisingDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="normalising-shift">Shift</label>
                        <select class="form-control" name="shift" :class="{'valid': !$v.normalising.shift.$invalid, 'invalid': $v.normalising.shift.$invalid }" v-model="$v.normalising.shift.$model" id="normalising-shift"  required>
                            <option value="A" >A</option>
                            <option value="B" >B</option>
                            <option value="C" >C</option>
                        </select>
                        <div v-if="$v.normalising.shift.$anyDirty && $v.normalising.shift.$invalid">
                            <small class="form-text text-danger" v-if="!$v.normalising.shift.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="normalising-noOfPlates">No Of Plates</label>
                        <input type="number" class="form-control" name="noOfPlates" id="normalising-noOfPlates"
                            :class="{'valid': !$v.normalising.noOfPlates.$invalid, 'invalid': $v.normalising.noOfPlates.$invalid }" v-model.number="$v.normalising.noOfPlates.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="normalising-normalisedTonnage">Normalised Tonnage</label>
                        <input type="number" class="form-control" name="normalisedTonnage" id="normalising-normalisedTonnage"
                            :class="{'valid': !$v.normalising.normalisedTonnage.$invalid, 'invalid': $v.normalising.normalisedTonnage.$invalid }" v-model.number="$v.normalising.normalisedTonnage.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="normalising-manager">Manager</label>
                        <select class="form-control" id="normalising-manager" name="manager" v-model="normalising.manager" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="normalising.manager && shiftManagerOption.id === normalising.manager.id ? normalising.manager : shiftManagerOption" v-for="shiftManagerOption in shiftManagers" :key="shiftManagerOption.id">{{shiftManagerOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.normalising.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./normalising-update.component.ts">
</script>
